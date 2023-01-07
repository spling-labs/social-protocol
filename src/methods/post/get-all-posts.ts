import { programId, shadowDriveDomain } from '../../utils/constants'
import { LikesChain, PostChain, TagsChain, UserChain } from '../../models'
import { Post, PostFileDataV2, PostTextFileData, PostUser, UserFileDataV2 } from '../../types'
import { getMediaDataWithUrl, getPostFileData, getPostFileDataV2, getPostTextFromFile } from './helpers'
import { getTextFromFile } from '../../utils/helpers'
import { PostNotFoundError, UserNotFoundError } from '../../utils/errors'
import { bs58 } from 'react-native-project-serum-anchor/dist/cjs/utils/bytes'
import { getUserFileData, getUserFileDataV2 } from '../user/helpers'
import * as anchor from 'react-native-project-serum-anchor'
import { web3 } from 'react-native-project-serum-anchor'
import { GetAllLikesByPublicKeysQuery, GetAllUserByUserIdQuery, Order_By, Splinglabs_0_1_0_Decoded_Likes, Splinglabs_0_1_0_Decoded_Post, Splinglabs_0_1_0_Decoded_Userprofile } from '../../gql/graphql'
import { GetAllPostByGroupIdQueryDocument } from '../../utils/gql/post'
import { GetAllTagsByPublicKeyQueryDocument } from '../../utils/gql/tag'
import { GetAllUserByUserIdQueryDocument } from '../../utils/gql/user'
import { GetAllLikesByPublicKeysQueryDocument } from '../../utils/gql/like'

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
      const tagList: string[] = tagsAndPosts[0]?.data?.splinglabs_0_1_0_decoded_tags_by_pk.taglist ?? []
      const onChainPosts: Splinglabs_0_1_0_Decoded_Post[] = tagsAndPosts[1].data.splinglabs_0_1_0_decoded_post

      // Get all users from posts.
      const onChainUsers: GetAllUserByUserIdQuery = await this.graphQLClient.request(GetAllUserByUserIdQueryDocument, { userIds: [...new Set(onChainPosts.map(post => post.uid))] })
      const users: Splinglabs_0_1_0_Decoded_Userprofile[] = onChainUsers.splinglabs_0_1_0_decoded_userprofile

      // Get all post and user profile json file from the shadow drives.
      const postsContentPromises: Promise<PostFileDataV2>[] = onChainPosts.map(post => {
        const userChain: Splinglabs_0_1_0_Decoded_Userprofile = users.find(user => user.uid == post.uid)
        return getPostFileDataV2(post.pid, new web3.PublicKey(post.cl_pubkey), new web3.PublicKey(userChain.shdw))
      })
      const usersContentPromises: Promise<UserFileDataV2>[] = users.filter((v, i, a) => a.findIndex(v2 => (v2.uid === v.uid)) === i).map(user => getUserFileDataV2(user.uid, new web3.PublicKey(user.shdw)))

      // Read all post and user files from shadow drives.
      let [postsContent, usersContent] = await Promise.all([
        Promise.all(postsContentPromises),
        Promise.all(usersContentPromises)
      ]);

      // Filter out null values to prevent errors.
      postsContent = postsContent.filter(value => value !== null)
      usersContent = usersContent.filter(value => value !== null)

      // Read all post text files from shadow drives.
      const postsText: PostTextFileData[] = await Promise.all(postsContent.map(postContent => {
          if (postContent.text !== null) {
            const userChain: Splinglabs_0_1_0_Decoded_Userprofile = users.find(user => user.uid == Number(postContent.userId))
            return getPostTextFromFile(postContent.postId, `${shadowDriveDomain}${userChain.shdw}/${postContent.text}`)
          }
          return null
      }))

      // Get all likes from posts.
      const onChainLikes: GetAllLikesByPublicKeysQuery = await this.graphQLClient.request(GetAllLikesByPublicKeysQueryDocument, {
        publicKeys: onChainPosts.map(post => {
          // Find likes pda.
          const [LikesPDA] = web3.PublicKey.findProgramAddressSync(
            [anchor.utils.bytes.utf8.encode('likes'), new web3.PublicKey(post.cl_pubkey).toBuffer()],
            programId,
          )
          return LikesPDA.toString()
        })
      })
      const postLikes: Splinglabs_0_1_0_Decoded_Likes[] = onChainLikes.splinglabs_0_1_0_decoded_likes

      for (const post of onChainPosts) {
        try {
          const userChain: Splinglabs_0_1_0_Decoded_Userprofile | undefined = users.find(user => user.uid == post.uid)
          if (userChain === undefined) throw new UserNotFoundError()

          const userShdwPublicKey: web3.PublicKey = new web3.PublicKey(userChain.shdw)
          const postPublicKey: web3.PublicKey = new web3.PublicKey(post.cl_pubkey)

          const postFileData: PostFileDataV2 | undefined = postsContent.find(postFile => postFile.postId == post.pid)
          if (postFileData === undefined) throw new PostNotFoundError()

          const userFileData: UserFileDataV2 | undefined = usersContent.find(userFile => userFile.userId == Number(postFileData.userId))
          if (userFileData === undefined) throw new UserNotFoundError()

          const postTextFile: PostTextFileData | undefined = postsText.find(postText => postText.postId == post.pid)
          if (postTextFile !== undefined) {
            postFileData.text = postTextFile.text
          }

          // Find likes pda.
          const [LikesPDA] = web3.PublicKey.findProgramAddressSync(
            [anchor.utils.bytes.utf8.encode('likes'), postPublicKey.toBuffer()],
            programId,
          )

          const likesChain: Splinglabs_0_1_0_Decoded_Likes = postLikes.find(likes => likes.cl_pubkey === LikesPDA.toString())

          // Push post data to array.
          posts.push({
            timestamp: post.ts,
            publicKey: postPublicKey,
            status: post.st,
            programId: postFileData.programId,
            postId: post.pid,
            userId: Number(postFileData.userId),
            groupId: Number(postFileData.groupId),
            title: postFileData.title,
            text: postFileData.text,
            media: getMediaDataWithUrl(postFileData.media, userShdwPublicKey),
            license: postFileData.license,
            user: {
              publicKey: new web3.PublicKey(userChain.username),
              nickname: userFileData.nickname,
              avatar:
                userFileData.avatar != null
                  ? `${shadowDriveDomain}${userChain.shdw.toString()}/${userFileData.avatar.file}`
                  : null,
            } as PostUser,
            likes: likesChain.users,
            tags: post.tid > 0 && tagList.length > post.tid ? [tagList[post.tid]] : []
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
            tags: postChain.tagIndex > 0 && tagsChain.tags.length > postChain.tagIndex ? [tagsChain.tags[postChain.tagIndex]] : []
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
