import * as anchor from 'react-native-project-serum-anchor'
import { web3 } from 'react-native-project-serum-anchor'
import { programId } from '../../utils/constants'

/**
 * @category Group
 * @param groupId - the id of the group
 */
export default async function joinGroup(groupId: number): Promise<void> {
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

    // Send user join group to the anchor program.
    await this.anchorProgram.methods
      .joinGroup(groupId)
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
