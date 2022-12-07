import { web3 } from 'react-native-project-serum-anchor'
import { shadowDriveDomain } from '../../utils/constants'
import { PostNotFoundError } from '../../utils/errors'
import { MediaData, PostFileData } from '../../types'
import axios from 'axios';

export async function getPostFileData(
  publicKey: web3.PublicKey,
  shdw: web3.PublicKey,
): Promise<PostFileData> {
  try {
    // Get post json file from the shadow drive.
    const response = await axios.get(`${shadowDriveDomain}${shdw.toString()}/${publicKey}.json`);
    if (response.status !== 200) throw new PostNotFoundError()

    return Promise.resolve(response.data as PostFileData)
  } catch (error) {
    return Promise.reject(error)
  }
}

export function getMediaDataWithUrl(
  mediaData: MediaData[],
  shdwPublicKey: web3.PublicKey,
): MediaData[] {
  return mediaData.map((media) => {
    return {
      file: `${shadowDriveDomain}${shdwPublicKey.toString()}/${media.file}`,
      type: media.type,
    } as MediaData
  })
}
