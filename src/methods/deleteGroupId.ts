import * as anchor from '@project-serum/anchor'
import { web3 } from '@project-serum/anchor'
import { programId } from '../utils/constants'

export default async function deleteGroupId(): Promise<boolean> {
  try {
    // Find the group id pda.
    const [GroupIdPDA] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('group_id'), this.wallet.publicKey.toBuffer()],
      programId,
    )

    // Delete the group profile from the anchor program.
    await this.anchorProgram.methods
      .deleteGroupId()
      .accounts({
        user: this.wallet.publicKey,
        groupId: GroupIdPDA,
      })
      .rpc()

    return Promise.resolve(true)
  } catch (error) {
    return Promise.reject(error)
  }
}
