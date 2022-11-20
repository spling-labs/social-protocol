import * as anchor from 'react-native-project-serum-anchor'
import { web3 } from 'react-native-project-serum-anchor'
import { programId, shadowDriveDomain } from '../../../utils/constants'
import { ReplyChain, UserChain } from '../../../models'
import { ReplyFileData } from '../../../types'
import { getReplyFileData } from './helpers'
import { getKeypairFromSeed } from '../../../utils/helpers'

/**
 * @category Post
 * @param publicKey - the PublicKey of the reply
 */
export default async function deletePostReply(publicKey: web3.PublicKey): Promise<void> {
  try {
    // Fetch the reply from the anchor program.
    const reply = await this.anchorProgram.account.reply.fetch(publicKey)
    const replyChain = new ReplyChain(publicKey, reply)

    // Find the user profile pda.
    const [UserProfilePDA] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('user_profile'), this.wallet.publicKey.toBuffer()],
      programId,
    )

    // Fetch the user profile.
    const profile = await this.anchorProgram.account.userProfile.fetch(UserProfilePDA)
    const userChain = new UserChain(profile.publicKey, profile)

    // Check if the user owns the post.
    if (replyChain.userId !== userChain.userId)
      throw new Error('The reply can be deleted only by the creator.')

    const replyFileData: ReplyFileData = await getReplyFileData(publicKey, userChain.shdw)

    // Remove text file.
    if (replyFileData.text != null) {
      try {
        await this.shadowDrive.deleteFile(
          userChain.shdw.toString(),
          `${shadowDriveDomain}${userChain.shdw.toString()}/${replyFileData.text}`,
          'v2',
        )
      } catch (error) {
        // Nothing to do here.
      }
    }

    // Delete reply json file from the shadow drive.
    try {
      await this.shadowDrive.deleteFile(
        userChain.shdw.toString(),
        `${shadowDriveDomain}${userChain.shdw.toString()}/${publicKey.toString()}.json`,
        'v2',
      )
    } catch (error) {
      // Nothing to do here.
    }

    // Generate the reply hash.
    const hash: web3.Keypair = getKeypairFromSeed(
      `${replyFileData.timestamp}${userChain.userId.toString()}${replyChain.postId.toString()}`,
    )

    // Find spling pda.
    const [SplingPDA] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('spling')],
      programId,
    )

    // Find reply pda.
    const [ReplyPDA] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('reply'), hash.publicKey.toBuffer()],
      programId,
    )

    // Submit the delete reply to the anchor program.
    await this.anchorProgram.methods
      .deleteReply(replyChain.postId, hash.publicKey)
      .accounts({
        user: this.wallet.publicKey,
        userProfile: UserProfilePDA,
        reply: ReplyPDA,
        spling: SplingPDA,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc()

    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error)
  }
}
