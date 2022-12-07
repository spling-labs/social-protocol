import { web3 } from 'react-native-project-serum-anchor'
import { shadowDriveDomain } from '../../utils/constants'
import { UserNotFoundError } from '../../utils/errors'
import { UserFileData } from '../../types'
import axios from 'axios';

export async function getUserFileData(shdw: web3.PublicKey): Promise<UserFileData> {
  try {
    // Get spling json file from the shadow drive.
    const response = await axios.get(`${shadowDriveDomain}${shdw.toString()}/profile.json`);
    if (response.status !== 200) throw new UserNotFoundError()
    
    return Promise.resolve(response.data as UserFileData)
  } catch (error) {
    return Promise.reject(error)
  }
}
