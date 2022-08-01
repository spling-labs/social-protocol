import { web3 } from '@project-serum/anchor'
import { shadowDriveDomain } from '../../utils/constants'
import { SplingNotFoundError } from '../../utils/errors'
import { SplingFileData } from '../../types'

export async function getSplingFileData(
  publicKey: web3.PublicKey,
  shdw: web3.PublicKey,
): Promise<SplingFileData> {
  try {
    // Get spling json file from the shadow drive.
    const splingJsonResponse: Response = await fetch(
      `${shadowDriveDomain}${shdw.toString()}/${publicKey}.json`,
    )
    if (!splingJsonResponse.ok) throw new SplingNotFoundError()

    // Check if json is valid.
    const splingJson: SplingFileData = await splingJsonResponse.json()

    return Promise.resolve(splingJson)
  } catch (error) {
    return Promise.reject(error)
  }
}
