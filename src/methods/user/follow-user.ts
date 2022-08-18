import * as anchor from '@project-serum/anchor'
import { web3 } from '@project-serum/anchor'
import { programId } from '../../utils/constants'

/**
 * @category User
 * @param userId - the id of the user
 */
export default async function followUser(userId: string): Promise<void> {
  try {
    // Find the user id pda.
    const [UserIdPDA] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('user_id'), this.wallet.publicKey.toBuffer()],
      programId,
    )

    // Fetch the user id.
    const user_id_pda = await this.anchorProgram.account.userId.fetch(UserIdPDA)
    const uid = user_id_pda.uid

    // Find the user profile pda.
    const [UserProfilePDA] = await web3.PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('user_profile'),
        anchor.utils.bytes.utf8.encode(uid.toString()),
      ],
      programId,
    )

    // Send follow user to the anchor program.
    await this.anchorProgram.methods
      .followUser(Number(userId))
      .accounts({
        user: this.wallet.publicKey,
        userId: UserIdPDA,
        userProfile: UserProfilePDA,
      })
      .rpc()

    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error)
  }
}
