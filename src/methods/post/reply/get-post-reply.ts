import { web3 } from 'react-native-project-serum-anchor'
import { shadowDriveDomain } from '../../../utils/constants'
import { ReplyChain, UserChain } from '../../../models'
import { Reply, ReplyFileData, PostUser, UserFileData } from '../../../types'
import { getReplyFileData } from './helpers'
import { getTextFromFile } from '../../../utils/helpers'
import { ReplyNotFoundError, UserNotFoundError } from '../../../utils/errors'
import { bs58 } from 'react-native-project-serum-anchor/dist/cjs/utils/bytes'
import { getUserFileData } from '../../user/helpers'

/**
 * @category Post
 * @param publicKey - the PublicKey of the reply
 */
export default async function getPostReply(publicKey: web3.PublicKey): Promise<Reply | null> {
  try {
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
    const userChain = new UserChain(profile.publicKey, profile.account)

    const replyFileData: ReplyFileData = await getReplyFileData(publicKey, userChain.shdw)

    replyFileData.text = await getTextFromFile(
      `${shadowDriveDomain}${userChain.shdw.toString()}/${replyFileData.text}`,
    )

    // Get user profile json file from the shadow drive.
    const userProfileJson: UserFileData = await getUserFileData(userChain.shdw)

    return Promise.resolve({
      timestamp: replyChain.timestamp,
      publicKey: replyChain.publicKey,
      status: replyChain.status,
      userId: Number(replyFileData.userId),
      postId: replyChain.postId,
      text: replyFileData.text,
      user: {
        publicKey: userChain.user,
        nickname: userProfileJson.nickname,
        avatar:
          userProfileJson.avatar != null
            ? `${shadowDriveDomain}${userChain.shdw.toString()}/${userProfileJson.avatar.file}`
            : null,
      } as PostUser,
    } as Reply)
  } catch (error) {
    if (
      error.message.includes('Account does not exist') ||
      error instanceof UserNotFoundError ||
      error instanceof ReplyNotFoundError
    )
      return Promise.resolve(null)
    return Promise.reject(error)
  }
}
