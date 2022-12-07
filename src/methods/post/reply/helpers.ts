import { web3 } from 'react-native-project-serum-anchor'
import { shadowDriveDomain } from '../../../utils/constants'
import { ReplyNotFoundError } from '../../../utils/errors'
import { ReplyFileData } from '../../../types'
import axios from 'axios';

export async function getReplyFileData(
  publicKey: web3.PublicKey,
  shdw: web3.PublicKey,
): Promise<ReplyFileData> {
  try {
    // Get reply json file from the shadow drive.
    const response = await axios.get(`${shadowDriveDomain}${shdw.toString()}/${publicKey}.json`);
    if (response.status !== 200) throw new ReplyNotFoundError()

    return Promise.resolve(response.data as ReplyFileData)
  } catch (error) {
    return Promise.reject(error)
  }
}
