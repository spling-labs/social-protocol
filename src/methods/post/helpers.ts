import { web3 } from '@project-serum/anchor'
import { shadowDriveDomain } from '../../utils/constants'
import { PostNotFoundError } from '../../utils/errors'
import { FileData, FileUriData, MediaData, PostFileData, PostFileDataV2, PostTextFileData } from '../../types'
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

export async function getPostFileDataV2(
  postId: number,
  publicKey: web3.PublicKey,
  shdw: web3.PublicKey,
): Promise<PostFileDataV2 | null> {
  try {
    // Get post json file from the shadow drive.
    const response = await axios.get(`${shadowDriveDomain}${shdw.toString()}/${publicKey}.json`);
    if (response.status !== 200) return Promise.resolve(null)

    // Add missing key.
    response.data.postId = postId

    return Promise.resolve(response.data as PostFileDataV2)
  } catch {
    return Promise.resolve(null)
  }
}

export async function getPostTextFromFile(postId: number, url: string): Promise<PostTextFileData | null> {
  try {
    const response = await axios.get(url);
    if (response.status !== 200) return Promise.resolve(null)

    return Promise.resolve({ postId: postId, text: response.data } as PostTextFileData)
  } catch {
    return Promise.resolve(null)
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


export function convertFilesToMediaData(
  postPDA: web3.PublicKey,
  files: FileData[] | FileUriData[],
): MediaData[] {
  return files.map((file) => {
    return {
      file: `${postPDA.toString()}.${file.type.split('/')[1]}`,
      type: file.type.split('/')[1],
    } as MediaData
  })
}
