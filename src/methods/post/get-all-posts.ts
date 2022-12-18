import { programId, shadowDriveDomain } from '../../utils/constants'
import { LikesChain, PostChain, TagsChain, UserChain } from '../../models'
import { Post, PostUser } from '../../types'
import { getMediaDataWithUrl, getPostFileData } from './helpers'
import { getTextFromFile } from '../../utils/helpers'
import { UserNotFoundError } from '../../utils/errors'
import { bs58 } from 'react-native-project-serum-anchor/dist/cjs/utils/bytes'
import { getUserFileData } from '../user/helpers'
import * as anchor from 'react-native-project-serum-anchor'
import { web3 } from 'react-native-project-serum-anchor'
import { GetAllLikesByPublicKeyQuery, GetUserByUserIdQuery, Order_By, Splinglabs_0_1_0_Decoded_Post } from '../../gql/graphql'
import { GetAllPostByGroupIdQueryDocument } from '../../utils/gql/post'
import { GetAllTagsByPublicKeyQueryDocument } from '../../utils/gql/tag'
import { GetUserByUserIdQueryDocument } from '../../utils/gql/user'
import { GetAllLikesByPublicKeyQueryDocument } from '../../utils/gql/like'

/**
 *  Get all posts for a group.
 * 
 * @category Post
 * 
 * @param {number} groupId The group id where the posts should be fetched.
 * @param {number|null} limit Maximum number of posts to return. (optional, requires useIndexer option to be enabled)
 * @param {number|null} offset Offset to start returning posts from. (optional, requires useIndexer option to be enabled)
 * @param {Order_By|null} orderBy The order to return posts by timestamp. (optional, requires useIndexer option to be enabled)
 * 
 * @return {Promise<Post[]>} - Promise resolving to an array of posts.
 */
export default async function getAllPosts(groupId: number, limit: number | null = null, offset: number | null = null, orderBy: Order_By | null = null): Promise<Post[]> {
  try {
    const posts: Post[] = []

    // Find tags pda.
    const [TagsPDA] = web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('tags')],
      programId,
    )

    if (this.graphQLClient !== null) {
      // Get tag list and all posts by specific group id.
      const tagsAndPosts = await this.graphQLClient.batchRequests([
        { document: GetAllTagsByPublicKeyQueryDocument, variables: { publicKey: TagsPDA.toString() } },
        { document: GetAllPostByGroupIdQueryDocument, variables: { limit: limit, offset: offset, orderBy: orderBy, groupId: groupId } }
      ])
      const tagList: string[] = tagsAndPosts[0].data.splinglabs_0_1_0_decoded_tags_by_pk.taglist ? tagsAndPosts[0].data.splinglabs_0_1_0_decoded_tags_by_pk.taglist : []
      const onChainPosts: Splinglabs_0_1_0_Decoded_Post[] = tagsAndPosts[1].data.splinglabs_0_1_0_decoded_post

      for (const post of onChainPosts) {
        try {
          const user: GetUserByUserIdQuery = await this.graphQLClient.request(GetUserByUserIdQueryDocument, { userId: post.uid })
          if (user.splinglabs_0_1_0_decoded_userprofile.length <= 0) throw new UserNotFoundError()

          const userChain = user.splinglabs_0_1_0_decoded_userprofile[0]
          const userShdwPublicKey: web3.PublicKey = new web3.PublicKey(userChain.shdw)
          const postPublicKey: web3.PublicKey = new web3.PublicKey(post.cl_pubkey)

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
          posts.push({
            timestamp: post.ts,
            publicKey: postPublicKey,
            status: post.st,
            programId: postFileData.programId,
            postId: post.pid,
            userId: Number(postFileData.userId),
            groupId: Number(postFileData.groupId),
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
            tags: post.tid ? [tagList[post.tid]] : []
          } as Post)
        } catch (error) {
          // Nothing to do.
        }
      }
    } else {
      const onChainPosts = await this.anchorProgram.account.post.all([
        {
          memcmp: {
            offset:
              8 + // Discriminator
              8 + // Timestamp
              4 + // userId
              4, // postId
            bytes: bs58.encode(Uint8Array.from([groupId])),
          },
        },
      ])

      // Fetch tag.
      const tags = await this.anchorProgram.account.tags.fetch(TagsPDA)
      const tagsChain = new TagsChain(TagsPDA, tags)

      for (const post of onChainPosts) {
        try {
          const postChain = new PostChain(post.publicKey, post.account)

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

          // Get likes of the post.
          const likes = await this.anchorProgram.account.likes.fetch(LikesPDA)
          const likesChain = new LikesChain(LikesPDA, likes)

          // Push post data to array.
          posts.push({
            timestamp: postChain.timestamp,
            publicKey: postChain.publicKey,
            status: postChain.status,
            programId: postFileData.programId,
            postId: postChain.postId,
            userId: Number(postFileData.userId),
            groupId: Number(postFileData.groupId),
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
            tags: postChain.tagIndex ? [tagsChain.tags[postChain.tagIndex]] : []
          } as Post)
        } catch (error) {
          // Nothing to do.
        }
      }
    }
    return Promise.resolve(posts)
  } catch (error) {
    Promise.reject(error)
  }
}
