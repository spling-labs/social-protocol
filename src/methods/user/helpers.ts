import { web3 } from 'react-native-project-serum-anchor'
import { shadowDriveDomain } from '../../utils/constants'
import { UserNotFoundError } from '../../utils/errors'
import { UserFileData } from '../../types'

export async function getUserFileData(shdw: web3.PublicKey): Promise<UserFileData> {
  try {
    // Get spling json file from the shadow drive.
    const userProfileJsonResponse: Response = await fetch(
      `${shadowDriveDomain}${shdw.toString()}/profile.json`,
    )
    if (!userProfileJsonResponse.ok) throw new UserNotFoundError()

    // Check if json is valid.
    const userProfileJson: UserFileData = await userProfileJsonResponse.json()

    return Promise.resolve(userProfileJson)
  } catch (error) {
    return Promise.reject(error)
  }
}
