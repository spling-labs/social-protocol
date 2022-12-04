import * as anchor from 'react-native-project-serum-anchor'
import { web3 } from 'react-native-project-serum-anchor'
import { programId, SPLING_TOKEN_ACCOUNT_RECEIVER, SPLING_TOKEN_ADDRESS } from '../../utils/constants'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'

/**
 * @category Group
 * @param groupId - the id of the group
 */
export default async function leaveGroup(groupId: number): Promise<void> {
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

    if (this.tokenAccount !== null) {
      // Find bank pda.
      const [BankPDA] = await web3.PublicKey.findProgramAddress(
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

    // Send user join group to the anchor program.
    await this.anchorProgram.methods
      .leaveGroup(groupId)
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
