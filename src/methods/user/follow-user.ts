import * as anchor from '@project-serum/anchor'
import { web3 } from '@project-serum/anchor'
import { programId } from '../../utils/constants'

/**
 * @category User
 * @param userId - the id of the user.
 */
export default async function followUser(userId: number): Promise<void> {
  try {
    // Find spling pda.
    const [SplingPDA] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('spling')],
      programId,
    )

    // Find the user profile pda.
    const [UserProfilePDA] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('user_profile'), this.wallet.publicKey.toBuffer()],
      programId,
    )

    // Send follow user to the anchor program.
    await this.anchorProgram.methods
      .followUser(userId)
      .accounts({
        user: this.wallet.publicKey,
        userProfile: UserProfilePDA,
        spling: SplingPDA,
      })
      .rpc()

    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error)
  }
}
