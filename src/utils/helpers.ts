import * as anchor from '@project-serum/anchor'
import {
  CreateStorageResponse,
  ShadowDriveResponse,
  ShdwDrive,
  StorageAccountInfo,
  StorageAccountResponse,
} from 'react-native-shadow-drive'
import { programId } from './constants'
import { StorageAccountNotFoundError } from './errors'
import { IDL, SocialIDL } from './idl'
import axios from 'axios';
import { FileData, FileUriData } from 'index'

/**
 * @param wallet The wallet used to pay for and sign all transactions.
 * @param connection The cluster connection where the program is deployed.
 */
export function createSocialProtocolProgram(
  connection: anchor.web3.Connection,
  wallet: anchor.Wallet,
): anchor.Program<SocialIDL> {
  const anchorProvider = new anchor.AnchorProvider(connection, wallet, {})
  return new anchor.Program(IDL, programId, anchorProvider)
}

/**
 * @param dataURI The dataURI that will be converted to an Blob.
 */
export function convertDataUriToBlob(dataURI: string): Blob {
  const byteString = atob(dataURI.split(',')[1])
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  return new Blob([ab], { type: mimeString })
}

export async function getOrCreateShadowDriveAccount(
  shadowDrive: ShdwDrive,
  spaceNeeded: number,
): Promise<StorageAccountResponse> {
  try {
    let account: StorageAccountResponse | null = null
    account = await getShadowDriveAccount(shadowDrive)
    if (account != null) {
      const accountInfo: StorageAccountInfo = await shadowDrive.getStorageAccount(account.publicKey)
      const available: number = accountInfo.reserved_bytes - accountInfo.current_usage 
      if (accountInfo.immutable) throw new Error('Spling storage account is immutable!')
      if (available >= spaceNeeded) return Promise.resolve(account)
      await addShadowDriveAccountStorage(shadowDrive, account.publicKey)
      return Promise.resolve(account)
    }

    await createShadowDriveAccount(shadowDrive)

    account = await getShadowDriveAccount(shadowDrive)

    if (account != null) return Promise.resolve(account)
    else throw new StorageAccountNotFoundError()
  } catch (error) {
    return Promise.reject(error)
  }
}

async function getShadowDriveAccount(
  shadowDrive: ShdwDrive,
): Promise<StorageAccountResponse | null> {
  try {
    const storageAccounts: StorageAccountResponse[] = await shadowDrive.getStorageAccounts('v2')
    if (storageAccounts.length == 0) return Promise.resolve(null)
    for (let index = 0; index < storageAccounts.length; index++) {
      const storageAccount = storageAccounts[index];
      if (storageAccount.account.identifier === 'Spling') return Promise.resolve(storageAccount)
    }
    return null
  } catch (error) {
    return Promise.reject(error)
  }
}

async function createShadowDriveAccount(shadowDrive: ShdwDrive): Promise<CreateStorageResponse> {
  try {
    const response = await shadowDrive.createStorageAccount('Spling', '10MB', 'v2')
    return Promise.resolve(response)
  } catch (error) {
    return Promise.reject(error)
  }
}

async function addShadowDriveAccountStorage(
  shadowDrive: ShdwDrive,
  publicKey: anchor.web3.PublicKey,
): Promise<ShadowDriveResponse> {
  try {
    const response = await shadowDrive.addStorage(publicKey, '10MB', 'v2')
    return Promise.resolve(response)
  } catch (error) {
    return Promise.reject(error)
  }
}

export function getPublicKeyFromSeed(seed: string): anchor.web3.PublicKey {
  const hex = new Uint8Array(Buffer.from(Buffer.from(seed.padEnd(32, '0'))))
  return anchor.web3.Keypair.fromSeed(hex).publicKey
}

export function getKeypairFromSeed(seed: string): anchor.web3.Keypair {
  const hex = new Uint8Array(Buffer.from(Buffer.from(seed.padEnd(32, '0'))))
  return anchor.web3.Keypair.fromSeed(hex)
}

export async function getTextFromFile(url: string): Promise<string | null> {
  try {
    const response = await axios.get(url);
    if (response.status !== 200) return Promise.resolve(null)

    return Promise.resolve(response.data)
  } catch (error) {
    return Promise.resolve(null)
  }
}

export function isValidAvatar(file: FileData | FileUriData): boolean {
  return ['jpg', 'jpeg', 'png', 'gif'].includes(file.type.split('/')[1]);
}

export function convertTextToOptionalString(text: string): string | null {
  return isValidJSON(text) ? JSON.stringify(text) : text
}

function isValidJSON(str: string): boolean {
  return /^[\s\n\r]*[{].*[}][\s\n\r]*$/.test(JSON.stringify(str))
}
