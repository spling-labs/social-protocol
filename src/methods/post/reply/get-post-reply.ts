import { web3 } from '@project-serum/anchor'
import { shadowDriveDomain } from '../../../utils/constants'
import { ReplyChain, UserChain } from '../../../models'
import { Reply, PostUser } from '../../../types'
import { getReplyFileData } from './helpers'
import { getTextFromFile } from '../../../utils/helpers'
import { ReplyNotFoundError, UserNotFoundError } from '../../../utils/errors'
import { bs58 } from '@project-serum/anchor/dist/cjs/utils/bytes'
import { getUserFileData } from '../../user/helpers'
import { GetReplyByPublicKeyQuery, GetUserByUserIdQuery, Splinglabs_0_1_0_Decoded_Reply } from '../../../gql/graphql'
import { GetReplyByPublicKeyQueryDocument } from '../../../utils/gql/reply'
import { GetUserByUserIdQueryDocument } from '../../../utils/gql/user'

/**
 * Retrieves a reply associated with a given public key
 * 
 * @category Post
 * 
 * @param {web3.PublicKey} publicKey - The public key of the reply to be retrieved.
 * 
 * @returns {Promise<Reply | null>} - The retrieved reply or null if none exists.
 */
export default async function getPostReply(publicKey: web3.PublicKey): Promise<Reply | null> {
  try {
    if (this.graphQLClient !== null) {
      const replyQuery: GetReplyByPublicKeyQuery = await this.graphQLClient.request(GetReplyByPublicKeyQueryDocument, { publicKey: publicKey.toString() })
      const replyChain: Splinglabs_0_1_0_Decoded_Reply | null = replyQuery.splinglabs_0_1_0_decoded_reply_by_pk
      if (replyChain === null) throw new ReplyNotFoundError()

      const user: GetUserByUserIdQuery = await this.graphQLClient.request(GetUserByUserIdQueryDocument, { userId: replyChain.uid })
      if (user.splinglabs_0_1_0_decoded_userprofile.length <= 0) throw new UserNotFoundError()

      const userChain = user.splinglabs_0_1_0_decoded_userprofile[0]
      const userShdwPublicKey: web3.PublicKey = new web3.PublicKey(userChain.shdw)
      const replyPublicKey: web3.PublicKey = new web3.PublicKey(replyChain.cl_pubkey)

      // Get reply and user profile json file from the shadow drive.
      const [replyFileData, userProfileJson] = await Promise.all([
        getReplyFileData(replyPublicKey, userShdwPublicKey),
        getUserFileData(userShdwPublicKey)
      ]);

      replyFileData.text = await getTextFromFile(
        `${shadowDriveDomain}${userChain.shdw.toString()}/${replyFileData.text}`,
      )

      return Promise.resolve({
        timestamp: replyChain.ts,
        publicKey: replyPublicKey,
        status: replyChain.st,
        userId: Number(replyFileData.userId),
        postId: replyChain.pid,
        text: replyFileData.text,
        user: {
          publicKey: new web3.PublicKey(userChain.username),
          nickname: userProfileJson.nickname,
          avatar:
            userProfileJson.avatar != null
              ? `${shadowDriveDomain}${userChain.shdw}/${userProfileJson.avatar.file}`
              : null,
        } as PostUser,
        metadata: replyFileData.metadata
      } as Reply)
    } else {
      // Fetch the post from the anchor program.
      const reply = await this.anchorProgram.account.reply.fetch(publicKey)
      const replyChain = new ReplyChain(publicKey, reply)

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
        getReplyFileData(publicKey, userChain.shdw),
        getUserFileData(userChain.shdw)
      ]);

      replyFileData.text = await getTextFromFile(
        `${shadowDriveDomain}${userChain.shdw.toString()}/${replyFileData.text}`,
      )

      return Promise.resolve({
        timestamp: replyChain.timestamp,
        publicKey: replyChain.publicKey,
        status: replyChain.status,
        userId: Number(replyFileData.userId),
        postId: replyChain.postId,
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
    }
  } catch (error) {
    if (
      error.message.includes('Account does not exist') ||
      error instanceof UserNotFoundError ||
      error instanceof ReplyNotFoundError
    ) {
      return Promise.resolve(null)
    }
    return Promise.reject(error)
  }
}
