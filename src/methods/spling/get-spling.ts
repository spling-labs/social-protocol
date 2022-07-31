import { web3 } from '@project-serum/anchor'
import { SplingChain } from '../../models'
import { Spling } from '../../types'

/**
 * @category Spling
 * @param publicKey - the PublicKey of the spling
 */
export default async function getSpling(publicKey: web3.PublicKey): Promise<Spling> {
  try {
    const group = await this.anchorProgram.account.group.fetch(publicKey)
    const splingChain = new SplingChain(publicKey, group)

    // TODO: Get name, bio and image from .json file.

    return Promise.resolve({
      publicKey: publicKey,
      user: splingChain.user,
      shdw: splingChain.shdw,
      hash: splingChain.hash,
      name: '',
      bio: '',
      image: '',
    } as Spling)
  } catch (error) {
    return Promise.reject(error)
  }
}
