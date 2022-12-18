import { shadowDriveDomain } from '../../../utils/constants'
import { ReplyChain, UserChain } from '../../../models'
import { PostUser } from '../../../types'
import { getReplyFileData } from './helpers'
import { getTextFromFile } from '../../../utils/helpers'
import { UserNotFoundError } from '../../../utils/errors'
import { bs58 } from 'react-native-project-serum-anchor/dist/cjs/utils/bytes'
import { getUserFileData } from '../../user/helpers'
import { Reply } from 'index'
import { web3 } from 'react-native-project-serum-anchor'
import { GetAllRepliesByPostIdQuery, GetUserByUserIdQuery, Order_By, Splinglabs_0_1_0_Decoded_Reply } from '../../../gql/graphql'
import { GetAllRepliesByPostIdQueryDocument } from '../../../utils/gql/reply'
import { GetUserByUserIdQueryDocument } from '../../../utils/gql/user'

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

      for (const onChainReply of onChainReplies) {
        try {
          const user: GetUserByUserIdQuery = await this.graphQLClient.request(GetUserByUserIdQueryDocument, { userId: onChainReply.uid })
          if (user.splinglabs_0_1_0_decoded_userprofile.length <= 0) throw new UserNotFoundError()

          const userChain = user.splinglabs_0_1_0_decoded_userprofile[0]
          const userShdwPublicKey: web3.PublicKey = new web3.PublicKey(userChain.shdw)
          const replyPublicKey: web3.PublicKey = new web3.PublicKey(onChainReply.cl_pubkey)

          // Get reply and user profile json file from the shadow drive.
          const [replyFileData, userProfileJson] = await Promise.all([
            getReplyFileData(replyPublicKey, userShdwPublicKey),
            getUserFileData(userShdwPublicKey)
          ]);

          replyFileData.text = await getTextFromFile(
            `${shadowDriveDomain}${userChain.shdw.toString()}/${replyFileData.text}`,
          )

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
              nickname: userProfileJson.nickname,
              avatar:
                userProfileJson.avatar != null
                  ? `${shadowDriveDomain}${userChain.shdw}/${userProfileJson.avatar.file}`
                  : null,
            } as PostUser,
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
