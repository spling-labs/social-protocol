import * as anchor from '@project-serum/anchor'
import { web3 } from '@project-serum/anchor'
import { programId } from '../../utils/constants'

/**
 * @category User
 */
export default async function deleteUser(): Promise<void> {
  try {
    // Delete the user profile on the anchor program.
    const [profilePDA, _] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('profile'), this.wallet.publicKey.toBuffer()],
      programId,
    )
    await this.anchorProgram.methods
      .deleteProfile()
      .accounts({
        user: this.wallet.publicKey,
        profile: profilePDA,
      })
      .rpc()

    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error)
  }
}
