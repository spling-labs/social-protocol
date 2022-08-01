import { shadowDriveDomain } from '../../utils/constants'
import { SplingChain } from '../../models/SplingChain'
import { Spling, SplingFileData } from '../../types'
import { getSplingFileData } from './helpers'

/**
 * @category Spling
 */
export default async function getAllSplings(): Promise<Spling[]> {
  const groups = await this.anchorProgram.account.group.all({})
  const splings: Spling[] = []

  for (const group of groups) {
    const splingChain = new SplingChain(group.publicKey, group.account)

    try {
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

      // Push spling data to array.
      splings.push({
        publicKey: splingChain.publicKey,
        user: splingChain.user,
        shdw: splingChain.shdw,
        hash: splingChain.hash,
        ...splingFileData,
      } as Spling)
    } catch (error) {
      // Nothing to do.
    }
  }
  return Promise.resolve(splings)
}
