import * as anchor from '@project-serum/anchor'
import { Program } from '@project-serum/anchor'
import {
  CreateStorageResponse,
  ShdwDrive,
  StorageAccountInfo,
  StorageAccountResponse,
} from '@shadow-drive/sdk'
import { programId } from './constants'
import { IDL, SocialIDL } from './idl'

/**
 * @param wallet The wallet used to pay for and sign all transactions.
 * @param connection The cluster connection where the program is deployed.
 */
export function createSocialProtocolProgram(
  connection: anchor.web3.Connection,
  wallet: anchor.Wallet,
): Program<SocialIDL> {
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
  immutable: boolean,
  spaceNeeded: number,
): Promise<StorageAccountResponse> {
  try {
    let account: StorageAccountResponse | null = null
    account = await getShadowDriveAccount(shadowDrive, immutable, spaceNeeded)
    if (account != null) return Promise.resolve(account)

    await createShadowDriveAccount(shadowDrive, spaceNeeded)

    account = await getShadowDriveAccount(shadowDrive, immutable, spaceNeeded)
    if (account != null) return Promise.resolve(account)
    else throw Error('Storage Account not found!')
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function getShadowDriveAccount(
  shadowDrive: ShdwDrive,
  immutable: boolean,
  spaceNeeded: number,
): Promise<StorageAccountResponse | null> {
  try {
    const storageAccounts = await shadowDrive.getStorageAccounts('v2')
    let account: StorageAccountResponse | null = null
    storageAccounts.forEach((storageAccount: StorageAccountResponse) => {
      if (
        storageAccount.account.immutable == immutable &&
        storageAccount.account.storage.valueOf() >= spaceNeeded
      ) {
        account = storageAccount
      }
    })
    return Promise.resolve(account)
  } catch (error) {
    return Promise.reject(error)
  }
}

export async function createShadowDriveAccount(
  shadowDrive: ShdwDrive,
  spaceNeeded: number,
): Promise<CreateStorageResponse> {
  try {
    const response = await shadowDrive.createStorageAccount(
      'Spling',
      convertBytesToHuman(spaceNeeded, true, 0),
      'v2',
    )
    return Promise.resolve(response)
  } catch (error) {
    return Promise.reject(error)
  }
}

export function getPublicKeyFromSeed(seed: string): anchor.web3.PublicKey {
  const hex = new Uint8Array(Buffer.from(Buffer.from(seed.padEnd(32, '0'))))
  return anchor.web3.Keypair.fromSeed(hex).publicKey
}

function convertBytesToHuman(bytes: number, si = false, dp = 1): string {
  const thresh = si ? 1024 : 1024

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B'
  }

  const units = si
    ? ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
  let u = -1
  const r = 10 ** dp

  do {
    bytes /= thresh
    ++u
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1)

  return bytes.toFixed(dp) + ' ' + units[u]
}
