import { web3 } from '@project-serum/anchor'
import { shadowDriveDomain } from '../../utils/constants'
import { PostNotFoundError } from '../../utils/errors'
import { PostFileData } from '../../types'

export async function getPostFileData(
  publicKey: web3.PublicKey,
  shdw: web3.PublicKey,
): Promise<PostFileData> {
  try {
    // Get post json file from the shadow drive.
    const splingJsonResponse: Response = await fetch(
      `${shadowDriveDomain}${shdw.toString()}/${publicKey}.json`,
    )
    if (!splingJsonResponse.ok) throw new PostNotFoundError()

    // Check if json is valid.
    const postJson: PostFileData = await splingJsonResponse.json()

    return Promise.resolve(postJson)
  } catch (error) {
    return Promise.reject(error)
  }
}