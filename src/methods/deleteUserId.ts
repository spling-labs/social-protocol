import * as anchor from '@project-serum/anchor'
import { web3 } from '@project-serum/anchor'
import { programId } from '../utils/constants'

export default async function deleteUserId(): Promise<boolean> {
  try {
    // Find the user id pda.
    const [UserIdPDA] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('user_id'), this.wallet.publicKey.toBuffer()],
      programId,
    )

    // Delete the user profile from the anchor program.
    await this.anchorProgram.methods
      .deleteUserId()
      .accounts({
        user: this.wallet.publicKey,
        userId: UserIdPDA,
      })
      .rpc()

    return Promise.resolve(true)
  } catch (error) {
    return Promise.reject(error)
  }
}
