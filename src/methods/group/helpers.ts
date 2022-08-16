import { web3 } from '@project-serum/anchor'
import { shadowDriveDomain } from '../../utils/constants'
import { GroupNotFoundError } from '../../utils/errors'
import { GroupFileData } from '../../types'

export async function getGroupFileData(shdw: web3.PublicKey): Promise<GroupFileData> {
  try {
    // Get group json file from the shadow drive.
    const groupJsonResponse: Response = await fetch(
      `${shadowDriveDomain}${shdw.toString()}/group.json`,
    )
    if (!groupJsonResponse.ok) throw new GroupNotFoundError()

    // Check if json is valid.
    const groupJson: GroupFileData = await groupJsonResponse.json()

    return Promise.resolve(groupJson)
  } catch (error) {
    return Promise.reject(error)
  }
}
