import * as anchor from 'react-native-project-serum-anchor'
import { web3 } from 'react-native-project-serum-anchor'
import { programId, SPLING_TOKEN_ACCOUNT_RECEIVER, SPLING_TOKEN_ADDRESS } from '../../utils/constants'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'

/**
 * Unfollows the user specified by the given user id.
 * 
 * @category User
 * 
 * @param {number} userId - The id of the user to unfollow.
 * 
 * @returns {Promise<void>} - A promise that resolves when the user has been unfollowed.
 */
export default async function unfollowUser(userId: number): Promise<void> {
  try {
    // Find spling pda.
    const [SplingPDA] = web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('spling')],
      programId,
    )

    // Find the user profile pda.
    const [UserProfilePDA] = web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('user_profile'), this.wallet.publicKey.toBuffer()],
      programId,
    )

    if (this.tokenAccount !== null) {
      // Find bank pda.
      const [BankPDA] = web3.PublicKey.findProgramAddressSync(
        [anchor.utils.bytes.utf8.encode('b')],
        programId,
      )

      // Extract transaction costs from the bank.
      await this.anchorProgram.methods
        .extractBank(new anchor.BN(10000))
        .accounts({
          user: this.wallet.publicKey,
          spling: SplingPDA,
          b: BankPDA,
          receiver: this.wallet.publicKey,
          senderTokenAccount: this.tokenAccount,
          receiverTokenAccount: SPLING_TOKEN_ACCOUNT_RECEIVER,
          mint: SPLING_TOKEN_ADDRESS,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc()
    }

    // Send follow user to the anchor program.
    await this.anchorProgram.methods
      .unfollowUser(userId)
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
