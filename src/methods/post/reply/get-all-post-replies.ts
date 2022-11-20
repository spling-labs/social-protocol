import { shadowDriveDomain } from '../../../utils/constants'
import { ReplyChain, UserChain } from '../../../models'
import { PostUser, ReplyFileData, UserFileData } from '../../../types'
import { getReplyFileData } from './helpers'
import { getTextFromFile } from '../../../utils/helpers'
import { UserNotFoundError } from '../../../utils/errors'
import { bs58 } from 'react-native-project-serum-anchor/dist/cjs/utils/bytes'
import { getUserFileData } from '../../user/helpers'
import { Reply } from 'index'

/**
 * @category Post
 * @param postId The post id where the replies should be fetched.
 */
export default async function getAllPostReplies(postId: number): Promise<Reply[]> {
  try {
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
    const replies: Reply[] = []
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
        const userChain = new UserChain(profile.publicKey, profile.account)

        const replyFileData: ReplyFileData = await getReplyFileData(
          replyChain.publicKey,
          userChain.shdw,
        )

        replyFileData.text = await getTextFromFile(
          `${shadowDriveDomain}${userChain.shdw.toString()}/${replyFileData.text}`,
        )

        // Get user profile json file from the shadow drive.
        const userProfileJson: UserFileData = await getUserFileData(userChain.shdw)

        // Push reply data to array.
        replies.push({
          timestamp: replyChain.timestamp,
          publicKey: replyChain.publicKey,
          status: replyChain.status,
          userId: Number(replyFileData.userId),
          postId: postId,
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
        // Nothing to do.
      }
    }
    return Promise.resolve(replies)
  } catch (error) {
    Promise.reject(error)
  }
}
