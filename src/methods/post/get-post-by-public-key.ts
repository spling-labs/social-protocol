import * as anchor from '@project-serum/anchor'
import { web3 } from '@project-serum/anchor'
import { programId, shadowDriveDomain } from '../../utils/constants'
import { LikesChain, PostChain, TagsChain, UserChain } from '../../models'
import { Post, PostUser } from '../../types'
import { getMediaDataWithUrl, getPostFileData } from './helpers'
import { getTextFromFile } from '../../utils/helpers'
import { PostNotFoundError, UserNotFoundError } from '../../utils/errors'
import { bs58 } from '@project-serum/anchor/dist/cjs/utils/bytes'
import { getUserFileData } from '../user/helpers'
import { GetAllTagsByPublicKeyQueryDocument } from '../../utils/gql/tag'
import { GetPostByPublicKeyQueryDocument } from '../../utils/gql/post'
import { GetAllLikesByPublicKeyQuery, GetUserByUserIdQuery, Splinglabs_0_1_0_Decoded_Post } from '../../gql/graphql'
import { GetUserByUserIdQueryDocument } from '../../utils/gql/user'
import { GetAllLikesByPublicKeyQueryDocument } from '../../utils/gql/like'

/**
 * Retrieves a post by its public key.
 * 
 * @category Post
 * 
 * @param {web3.PublicKey} publicKey - The public key of the post.
 * 
 * @returns {Promise<Post | null>} - Returns a Promise that resolves with the post associated with the public key, or null if no post was found.
 */
export default async function getPostByPublicKey(publicKey: web3.PublicKey): Promise<Post | null> {
  try {
    // Find tags pda.
    const [TagsPDA] = web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('tags')],
      programId,
    )

    if (this.graphQLClient !== null) {
      // Get tag list and post by specific public key.
      const tagsAndPost = await this.graphQLClient.batchRequests([
        { document: GetAllTagsByPublicKeyQueryDocument, variables: { publicKey: TagsPDA.toString() } },
        { document: GetPostByPublicKeyQueryDocument, variables: { publicKey: publicKey.toString() } }
      ])
      const tagList: string[] = tagsAndPost[0]?.data?.splinglabs_0_1_0_decoded_tags_by_pk.taglist ?? []
      const onChainPost: Splinglabs_0_1_0_Decoded_Post | null = tagsAndPost[1].data.splinglabs_0_1_0_decoded_post_by_pk
      if (onChainPost === null) throw new PostNotFoundError()

      const user: GetUserByUserIdQuery = await this.graphQLClient.request(GetUserByUserIdQueryDocument, { userId: onChainPost.uid })
      if (user.splinglabs_0_1_0_decoded_userprofile.length <= 0) throw new UserNotFoundError()

      const userChain = user.splinglabs_0_1_0_decoded_userprofile[0]
      const userShdwPublicKey: web3.PublicKey = new web3.PublicKey(userChain.shdw)
      const postPublicKey: web3.PublicKey = new web3.PublicKey(onChainPost.cl_pubkey)

      // Get post and user profile json file from the shadow drive.
      const [postFileData, userProfileJson] = await Promise.all([
        getPostFileData(postPublicKey, userShdwPublicKey),
        getUserFileData(userShdwPublicKey)
      ]);

      if (postFileData.text != null) {
        postFileData.text = await getTextFromFile(
          `${shadowDriveDomain}${userChain.shdw}/${postFileData.text}`,
        )
      }

      // Find likes pda.
      const [LikesPDA] = web3.PublicKey.findProgramAddressSync(
        [anchor.utils.bytes.utf8.encode('likes'), postPublicKey.toBuffer()],
        programId,
      )

      const likes: GetAllLikesByPublicKeyQuery = await this.graphQLClient.request(GetAllLikesByPublicKeyQueryDocument, { publicKey: LikesPDA.toString() })
      const likesChain = likes.splinglabs_0_1_0_decoded_likes_by_pk

      // Push post data to array.
      return Promise.resolve({
        timestamp: onChainPost.ts,
        publicKey: postPublicKey,
        status: onChainPost.st,
        programId: postFileData.programId,
        postId: onChainPost.pid,
        userId: Number(postFileData.userId),
        groupId: Number(postFileData.groupId),
        title: postFileData.title,
        text: postFileData.text,
        media: getMediaDataWithUrl(postFileData.media, userShdwPublicKey),
        license: postFileData.license,
        user: {
          publicKey: new web3.PublicKey(userChain.username),
          nickname: userProfileJson.nickname,
          avatar:
            userProfileJson.avatar != null
              ? `${shadowDriveDomain}${userChain.shdw.toString()}/${userProfileJson.avatar.file}`
              : null,
        } as PostUser,
        likes: likesChain.users,
        tags:  onChainPost.tid > 0 && tagList.length > onChainPost.tid ? [tagList[onChainPost.tid]] : [],
        metadata: postFileData.metadata
      } as Post)
    } else {
      // Fetch the post from the anchor program.
      const post = await this.anchorProgram.account.post.fetch(publicKey)
      const postChain = new PostChain(publicKey, post)

      // Fetch the user profile.
      const onChainProfiles = await this.anchorProgram.account.userProfile.all([
        {
          memcmp: {
            offset:
              8 + // Discriminator
              8 + // Timestamp
              32, // user
            bytes: bs58.encode(Uint8Array.from([postChain.userId])),
          },
        },
      ])
      if (onChainProfiles.length === 0) throw new UserNotFoundError()

      const profile = onChainProfiles[0]
      const userChain = new UserChain(profile.account)

      // Get post and user profile json file from the shadow drive.
      const [postFileData, userProfileJson] = await Promise.all([
        getPostFileData(postChain.publicKey, userChain.shdw),
        getUserFileData(userChain.shdw)
      ]);

      if (postFileData.text != null) {
        postFileData.text = await getTextFromFile(
          `${shadowDriveDomain}${userChain.shdw.toString()}/${postFileData.text}`,
        )
      }

      // Find likes pda.
      const [LikesPDA] = web3.PublicKey.findProgramAddressSync(
        [anchor.utils.bytes.utf8.encode('likes'), postChain.publicKey.toBuffer()],
        programId,
      )

      // Fetch likes of the post and tags.
      const [likes, tags] = await Promise.all([
        await this.anchorProgram.account.likes.fetch(LikesPDA),
        await this.anchorProgram.account.tags.fetch(TagsPDA)
      ]);

      const likesChain = new LikesChain(LikesPDA, likes)
      const tagsChain = new TagsChain(TagsPDA, tags)

      return Promise.resolve({
        timestamp: postChain.timestamp,
        publicKey: publicKey,
        status: postChain.status,
        programId: postFileData.programId,
        userId: Number(postFileData.userId),
        postId: postChain.postId,
        groupId: Number(postFileData.groupId),
        title: postFileData.title,
        text: postFileData.text,
        media: getMediaDataWithUrl(postFileData.media, userChain.shdw),
        license: postFileData.license,
        user: {
          publicKey: userChain.user,
          nickname: userProfileJson.nickname,
          avatar:
            userProfileJson.avatar != null
              ? `${shadowDriveDomain}${userChain.shdw.toString()}/${userProfileJson.avatar.file}`
              : null,
        } as PostUser,
        likes: likesChain.users,
        tags: postChain.tagIndex > 0 && tagsChain.tags.length > postChain.tagIndex ? [tagsChain.tags[postChain.tagIndex]] : [],
        metadata: postFileData.metadata
      } as Post)
    }
  } catch (error) {
    if (
      error.message.includes('Account does not exist') ||
      error instanceof UserNotFoundError ||
      error instanceof PostNotFoundError
    ) {
      return Promise.resolve(null)
    }
    return Promise.reject(error)
  }
}
