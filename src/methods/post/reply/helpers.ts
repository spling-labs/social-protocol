import { web3 } from 'react-native-project-serum-anchor'
import { shadowDriveDomain } from '../../../utils/constants'
import { ReplyNotFoundError } from '../../../utils/errors'
import { ReplyFileData } from '../../../types'

export async function getReplyFileData(
  publicKey: web3.PublicKey,
  shdw: web3.PublicKey,
): Promise<ReplyFileData> {
  try {
    // Get reply json file from the shadow drive.
    const splingJsonResponse: Response = await fetch(
      `${shadowDriveDomain}${shdw.toString()}/${publicKey}.json`,
    )
    if (!splingJsonResponse.ok) throw new ReplyNotFoundError()

    // Check if json is valid.
    const replyJson: ReplyFileData = await splingJsonResponse.json()

    return Promise.resolve(replyJson)
  } catch (error) {
    return Promise.reject(error)
  }
}
