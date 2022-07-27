import { getPublicKeyFromSeed, getShadowDriveAccount } from '../../utils/helpers'
import { FileData, Spling } from '../../types'
import { web3 } from '@project-serum/anchor'
import { programId } from '../../utils/constants'

/**
 * @category Spling
 * @param spling - the spling that will be created
 */
export default async function createSpling(
  index: number,
  name: string,
  bio: string | null,
  image: FileData | null,
): Promise<Spling> {
  // Find/Create shadow drive account.
  const account = await getShadowDriveAccount(false, 1000)

  /* // Increment Group Index
  await this.anchorProgram.methods
    .incrementGroupIndex()
    .accounts({
      user: this.wallet.publicKey,
      item: group.publicKey,
    })
    .rpc()
    */

  // Generate the hash from the username.
  const hash: web3.PublicKey = getPublicKeyFromSeed(name.toString())

  await this.anchorProgram.methods
    .submitGroup(account.publicKey, hash, 1)
    .accounts({
      user: this.wallet.publicKey,
    })
    .rpc()

  const accounts = await (this.connection as web3.Connection).getParsedProgramAccounts(programId, {
    commitment: 'confirmed',
  })
  accounts.forEach((account) => {
    // Parse the account data
    console.log(account)
  })
  return Promise.resolve({ name: '', bio: '', avatar: '' })
}
