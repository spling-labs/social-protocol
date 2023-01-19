import { shadowDriveDomain } from '../../../utils/constants'
import { ReplyChain, UserChain } from '../../../models'
import { PostUser, ReplyFileDataV2, ReplyTextFileData, UserFileDataV2 } from '../../../types'
import { getReplyFileData, getReplyFileDataV2, getReplyTextFromFile } from './helpers'
import { getTextFromFile } from '../../../utils/helpers'
import { ReplyNotFoundError, UserNotFoundError } from '../../../utils/errors'
import { bs58 } from '@project-serum/anchor/dist/cjs/utils/bytes'
import { getUserFileData, getUserFileDataV2 } from '../../user/helpers'
import { Reply } from 'index'
import { web3 } from '@project-serum/anchor'
import { GetAllRepliesByPostIdQuery, GetAllUserByUserIdQuery, Order_By, Splinglabs_0_1_0_Decoded_Reply, Splinglabs_0_1_0_Decoded_Userprofile } from '../../../gql/graphql'
import { GetAllRepliesByPostIdQueryDocument } from '../../../utils/gql/reply'
import { GetAllUserByUserIdQueryDocument } from '../../../utils/gql/user'

/**
 * @category Post
 * 
 * @param postId The post id where the post replies should be fetched.
 * @param {number|null} limit Maximum number of replies to return. (optional, requires useIndexer option to be enabled)
 * @param {number|null} offset Offset to start returning replies from. (optional, requires useIndexer option to be enabled)
 * @param {Order_By|null} orderBy The order to return replies by timestamp. (optional, requires useIndexer option to be enabled)
 * 
 * @return {Promise<Reply[]>} - Promise resolving to an array of replies.
 */
export default async function getAllPostReplies(postId: number, limit: number | null = null, offset: number | null = null, orderBy: Order_By | null = null): Promise<Reply[]> {
  try {
    const replies: Reply[] = []

    if (this.graphQLClient !== null) {
      const replyQuery: GetAllRepliesByPostIdQuery = await this.graphQLClient.request(GetAllRepliesByPostIdQueryDocument, { postId: postId, limit: limit, offset: offset, orderBy: orderBy })
      const onChainReplies: Splinglabs_0_1_0_Decoded_Reply[] = replyQuery.splinglabs_0_1_0_decoded_reply

      // Get all users from replies.
      const onChainUsers: GetAllUserByUserIdQuery = await this.graphQLClient.request(GetAllUserByUserIdQueryDocument, { userIds: [...new Set(onChainReplies.map(reply => reply.uid))] })
      const users: Splinglabs_0_1_0_Decoded_Userprofile[] = onChainUsers.splinglabs_0_1_0_decoded_userprofile

      // Get all post and user profile json file from the shadow drives.
      const repliesContentPromises: Promise<ReplyFileDataV2>[] = onChainReplies.map(post => {
        const userChain: Splinglabs_0_1_0_Decoded_Userprofile | undefined = users.find(user => user.uid == post.uid)
        if (userChain === undefined) return null
        return getReplyFileDataV2(post.cl_pubkey, userChain.shdw)
      })
      const usersContentPromises: Promise<UserFileDataV2>[] = users.filter((v, i, a) => a.findIndex(v2 => (v2.uid === v.uid)) === i).map(user => getUserFileDataV2(user.uid, new web3.PublicKey(user.shdw)))

      // Read all reply and user files from shadow drives.
      let [repliesContent, usersContent] = await Promise.all([
        Promise.all(repliesContentPromises),
        Promise.all(usersContentPromises)
      ]);

      // Filter out null values to prevent errors.
      repliesContent = repliesContent.filter(value => value !== null)
      usersContent = usersContent.filter(value => value !== null)

      // Read all reply text files from shadow drives.
      const repliesText: ReplyTextFileData[] = await Promise.all(repliesContent.map(replyContent => {
        if (replyContent.text !== null) {
          const userChain: Splinglabs_0_1_0_Decoded_Userprofile | undefined = users.find(user => user.uid == Number(replyContent.userId))
          if (userChain === undefined) return null
          return getReplyTextFromFile(replyContent.publicKey, `${shadowDriveDomain}${userChain.shdw.toString()}/${replyContent.text}`)
        }
        return null
      }))

      for (const onChainReply of onChainReplies) {
        try {
          const userChain: Splinglabs_0_1_0_Decoded_Userprofile | undefined = users.find(user => user.uid == onChainReply.uid)
          if (userChain == undefined) throw new UserNotFoundError()

          const replyPublicKey: web3.PublicKey = new web3.PublicKey(onChainReply.cl_pubkey)

          const replyFileData: ReplyFileDataV2 | undefined = repliesContent.find(replyFile => replyFile.publicKey == onChainReply.cl_pubkey)
          if (replyFileData == undefined) throw new ReplyNotFoundError()

          const userFileData: UserFileDataV2 | undefined = usersContent.find(userFile => userFile.userId == Number(replyFileData.userId))
          if (userFileData == undefined) throw new UserNotFoundError()

          const postTextFile: ReplyTextFileData | undefined = repliesText.find(replyText => replyText.publicKey == onChainReply.cl_pubkey)
          if (postTextFile !== undefined) {
            replyFileData.text = postTextFile.text
          }

          // Push reply data to array.
          replies.push({
            timestamp: onChainReply.ts,
            publicKey: replyPublicKey,
            status: onChainReply.st,
            userId: Number(replyFileData.userId),
            postId: postId,
            text: replyFileData.text,
            user: {
              publicKey: new web3.PublicKey(userChain.username),
              nickname: userFileData.nickname,
              avatar:
                userFileData.avatar != null
                  ? `${shadowDriveDomain}${userChain.shdw}/${userFileData.avatar.file}`
                  : null,
            } as PostUser,
            metadata: replyFileData.metadata
          } as Reply)
        } catch (error) {
          // Nothing to do.
        }
      }
    } else {
      const onChainPostReplies = await this.anchorProgram.account.reply.all([
        {
          memcmp: {
            offset:
              8 + // Discriminator
              8 + // Timestamp
              4, // userId
            bytes: bs58.encode(Uint8Array.from([postId])),
          },
        },
      ])

      for (const reply of onChainPostReplies) {
        try {
          const replyChain = new ReplyChain(reply.publicKey, reply.account)

          // Fetch the user profile.
          const onChainProfiles = await this.anchorProgram.account.userProfile.all([
            {
              memcmp: {
                offset:
                  8 + // Discriminator
                  8 + // Timestamp
                  32, // user
                bytes: bs58.encode(Uint8Array.from([replyChain.userId])),
              },
            },
          ])
          if (onChainProfiles.length === 0) throw new UserNotFoundError()

          const profile = onChainProfiles[0]
          const userChain = new UserChain(profile.account)

          // Get reply and user profile json file from the shadow drive.
          const [replyFileData, userProfileJson] = await Promise.all([
            getReplyFileData(replyChain.publicKey, userChain.shdw),
            getUserFileData(userChain.shdw)
          ]);

          replyFileData.text = await getTextFromFile(
            `${shadowDriveDomain}${userChain.shdw.toString()}/${replyFileData.text}`,
          )

          // Push reply data to array.
          replies.push({
            timestamp: replyChain.timestamp,
            publicKey: replyChain.publicKey,
            status: replyChain.status,
            userId: Number(replyFileData.userId),
            postId: postId,
            text: replyFileData.text,
            user: {
              publicKey: userChain.publicKey,
              nickname: userProfileJson.nickname,
              avatar:
                userProfileJson.avatar != null
                  ? `${shadowDriveDomain}${userChain.shdw.toString()}/${userProfileJson.avatar.file}`
                  : null,
            } as PostUser,
            metadata: replyFileData.metadata
          } as Reply)
        } catch (error) {
          // Nothing to do.
        }
      }
    }
    return Promise.resolve(replies)
  } catch (error) {
    Promise.reject(error)
  }
}
