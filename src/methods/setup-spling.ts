import * as anchor from 'react-native-project-serum-anchor'
import { web3 } from 'react-native-project-serum-anchor'
import { programId } from '../utils/constants'

/**
 * @category General
 */
export default async function setupSpling(): Promise<void> {
  try {
    // Find spling pda.
    const [SplingPDA] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('spling')],
      programId,
    )

    await this.anchorProgram.methods
      .setupSpling()
      .accounts({
        user: this.wallet.publicKey,
        spling: SplingPDA,
      })
      .rpc()

    const spling = await this.anchorProgram.account.spling.fetch(SplingPDA)
    console.log(spling)

    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error)
  }
}
