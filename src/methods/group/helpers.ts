import { web3 } from 'react-native-project-serum-anchor'
import { shadowDriveDomain } from '../../utils/constants'
import { GroupNotFoundError } from '../../utils/errors'
import { GroupFileData, GroupFileDataV2 } from '../../types'
import axios from 'axios';

export async function getGroupFileData(shdw: web3.PublicKey): Promise<GroupFileData> {
  try {
    // Get group json file from the shadow drive.
    const response = await axios.get(`${shadowDriveDomain}${shdw.toString()}/group.json`);
    if (response.status !== 200) throw new GroupNotFoundError()
    
    return Promise.resolve(response.data as GroupFileData)
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function getGroupFileDataV2(groupId: number, shdw: string): Promise<GroupFileDataV2 | null> {
  try {
    // Get group json file from the shadow drive.
    const response = await axios.get(`${shadowDriveDomain}${shdw}/group.json`);
    if (response.status !== 200) return Promise.resolve(null)

    // Add missing key.
    response.data.groupId = groupId

    return Promise.resolve(response.data as GroupFileDataV2)
  } catch {
    return Promise.resolve(null)
  }
}
