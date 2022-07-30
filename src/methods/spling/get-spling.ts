import { web3 } from '@project-serum/anchor'
import { Spling } from '../../types'

/**
 * @category Spling
 * @param publicKey - the PublicKey of the spling
 */
export default async function getSpling(publicKey: web3.PublicKey): Promise<Spling> {
  return Promise.resolve({ name: '', bio: '', image: '' })
}
