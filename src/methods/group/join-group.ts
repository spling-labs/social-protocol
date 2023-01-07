import * as anchor from 'react-native-project-serum-anchor'
import { web3 } from 'react-native-project-serum-anchor'
import { programId, SPLING_TOKEN_ACCOUNT_RECEIVER, SPLING_TOKEN_ADDRESS } from '../../utils/constants'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'

/**
 * Join group with the given group id.
 * 
 * @category Group
 * 
 * @param {number} groupId - the id of the group.
 * 
 * @returns A promise that resolves when the user has joined the group.
 */
export default async function joinGroup(groupId: number): Promise<void> {
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

    // Find bank pda.
    const [BankPDA] = web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('b')],
      programId,
    )

    // Send user join group to the anchor program.
    const transactionCosts = this.tokenAccount !== null ? new anchor.BN(10000) : null
    await this.anchorProgram.methods
      .joinGroup(groupId, transactionCosts)
      .accounts({
        user: this.wallet.publicKey,
        userProfile: UserProfilePDA,
        spling: SplingPDA,
        b: BankPDA,
        receiver: this.wallet.publicKey,
        senderTokenAccount: this.tokenAccount,
        receiverTokenAccount: SPLING_TOKEN_ACCOUNT_RECEIVER,
        mint: SPLING_TOKEN_ADDRESS,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc()

    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error)
  }
}
