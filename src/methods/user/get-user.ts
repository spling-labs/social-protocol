import * as anchor from '@project-serum/anchor'
import { web3 } from '@project-serum/anchor'
import { programId, shadowDriveDomain } from '../../utils/constants'
import { User } from '../../types'
import { UserNotFoundError, InvalidHashError } from '../../utils/errors'
import { getPublicKeyFromSeed } from '../../utils/helpers'

/**
 * @category User
 * @param publicKey - The PublicKey of the user.
 */
export default async function getUser(publicKey: web3.PublicKey): Promise<User> {
  try {
    const [ItemPDA, _] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('item'), publicKey.toBuffer()],
      programId,
    )
    const result = await this.anchorProgram.account.item.fetch(ItemPDA)
    const shdwPublicKey: string = (result.shdw as web3.PublicKey).toString()

    // Get user profile json file from the shadow drive.
    const userProfileJsonResponse: Response = await fetch(
      `${shadowDriveDomain}${shdwPublicKey}/${result.index}.json`,
    )
    if (userProfileJsonResponse.status == 404) throw new UserNotFoundError()
    const userProfileJson = await userProfileJsonResponse.json()

    if (userProfileJson.avatar.toString().length > 0) {
      userProfileJson.avatar = `${shadowDriveDomain}${shdwPublicKey}/${userProfileJson.avatar}`
    }

    // Get user biography text from file on the shadow drive.
    if (userProfileJson.bio.toString().length > 0) {
      const response: Response = await fetch(
        `${shadowDriveDomain}${shdwPublicKey}/b${result.index}.txt`,
      )
      if (response.status == 404) {
        userProfileJson.bio = ''
      } else {
        userProfileJson.bio = await response.text()
      }
    }

    const hash: web3.PublicKey = getPublicKeyFromSeed(userProfileJson.username.toString())
    if (hash.toString() == (result.hash as web3.PublicKey).toString()) {
      return Promise.resolve(userProfileJson)
    } else throw new InvalidHashError()
  } catch (error) {
    return Promise.reject(error)
  }
}
