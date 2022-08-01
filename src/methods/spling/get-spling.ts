import { web3 } from '@project-serum/anchor'
import { shadowDriveDomain } from '../../utils/constants'
import { SplingChain } from '../../models'
import { Spling, SplingFileData } from '../../types'
import { getSplingFileData } from './helpers'

/**
 * @category Spling
 * @param publicKey - the PublicKey of the spling
 */
export default async function getSpling(publicKey: web3.PublicKey): Promise<Spling> {
  try {
    const group = await this.anchorProgram.account.group.fetch(publicKey)
    const splingChain = new SplingChain(publicKey, group)

    const splingFileData: SplingFileData = await getSplingFileData(
      splingChain.publicKey,
      splingChain.shdw,
    )

    // Build spling image url from shadow drive.
    if (splingFileData.image.toString().length > 0) {
      splingFileData.image = `${shadowDriveDomain}${splingChain.shdw.toString()}/${
        splingFileData.image
      }`
    }

    return Promise.resolve({
      publicKey: publicKey,
      user: splingChain.user,
      shdw: splingChain.shdw,
      hash: splingChain.hash,
      ...splingFileData,
    } as Spling)
  } catch (error) {
    return Promise.reject(error)
  }
}
