import { web3 } from 'react-native-project-serum-anchor'
import { shadowDriveDomain } from '../../../utils/constants'
import { ReplyNotFoundError } from '../../../utils/errors'
import { ReplyFileData, ReplyFileDataV2, ReplyTextFileData } from '../../../types'
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

export async function getReplyFileDataV2(publicKey: string, shdw: string): Promise<ReplyFileDataV2 | null> {
  try {
    // Get reply json file from the shadow drive.
    const response = await axios.get(`${shadowDriveDomain}${shdw.toString()}/${publicKey}.json`);
    if (response.status !== 200) return Promise.resolve(null)

    // Add missing key.
    response.data.publicKey = publicKey

    return Promise.resolve(response.data as ReplyFileDataV2)
  } catch {
    return Promise.resolve(null)
  }
}

export async function getReplyTextFromFile(publicKey: string, url: string): Promise<ReplyTextFileData | null> {
  try {
    const response = await axios.get(url);
    if (response.status !== 200) return Promise.resolve(null)

    return Promise.resolve({ publicKey: publicKey, text: response.data } as ReplyTextFileData)
  } catch {
    return Promise.resolve(null)
  }
}
