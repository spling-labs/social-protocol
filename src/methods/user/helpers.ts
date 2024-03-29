import { web3 } from '@project-serum/anchor'
import { shadowDriveDomain } from '../../utils/constants'
import { UserNotFoundError } from '../../utils/errors'
import { UserFileData, UserFileDataV2 } from '../../types'
import axios from 'axios';

export async function getUserFileData(shdw: web3.PublicKey): Promise<UserFileData> {
  try {
    // Get spling json file from the shadow drive.
    const response = await axios.get(`${shadowDriveDomain}${shdw.toString()}/profile.json?timestamp=${new Date().getTime()}`);
    if (response.status !== 200) throw new UserNotFoundError()

    return Promise.resolve(response.data as UserFileData)
  } catch {
    return Promise.reject(new UserNotFoundError())
  }
}

export async function getUserFileDataV2(userId: number, shdw: web3.PublicKey): Promise<UserFileDataV2 | null> {
  try {
    // Get spling json file from the shadow drive.
    const response = await axios.get(`${shadowDriveDomain}${shdw.toString()}/profile.json?timestamp=${new Date().getTime()}`);
    if (response.status !== 200) return Promise.resolve(null)

    // Add missing key.
    response.data.userId = userId

    return Promise.resolve(response.data as UserFileDataV2)
  } catch {
    return Promise.resolve(null)
  }
}
