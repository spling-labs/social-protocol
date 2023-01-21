import { convertDataUriToBlob, getOrCreateShadowDriveAccount } from '../../utils/helpers'
import { FileData, FileUriData, MediaData, User, UserFileData } from '../../types'
import * as anchor from '@project-serum/anchor'
import { web3 } from '@project-serum/anchor'
import { isBrowser, programId, shadowDriveDomain, SPLING_TOKEN_ACCOUNT_RECEIVER, SPLING_TOKEN_ADDRESS } from '../../utils/constants'
import { ShadowFile, StorageAccountResponse } from 'react-native-shadow-drive'
import { UserChain } from '../../models'
import dayjs from 'dayjs'
import { SocialIDL } from '../../utils/idl'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { PublicKey } from '@solana/web3.js'

/**
 * Creates a user with the given parameters.
 * 
 * @category User
 * 
 * @param {string} nickname - The nickname of the user to be created.
 * @param {FileData | FileUriData | null} avatar - An avatar for the new user. Can be a FileData object, a FileUriData object, or null.
 * @param {string | null} biography - A biography for the new user. Can be a string or null.
 * @param {any | null} metadata - An json object containing any relevant metadata to be associated with the user.
 * 
 * @returns {Promise<User>} A promise that resolves to the newly created user.
 */
export default async function createUser(
  nickname: string,
  avatar: FileData | FileUriData | null,
  biography: string | null,
  metadata: any | null = null,
): Promise<User> {
  try {
    // Check if metadata object is a valid json.
    const metadataObject: any | null = metadata ? JSON.parse(JSON.stringify(metadata)) : null
    if (typeof metadataObject !== 'object') throw new Error('Invalid JSON object')

    let fileSizeSummarized = 1024 // 1024 bytes will be reserved for the userProfile.json.
    const filesToUpload: any[] = []

    if (avatar !== null) {
      fileSizeSummarized += avatar.size

      if (!isBrowser) {
        filesToUpload.push({
          uri: (avatar as FileUriData).uri,
          name: `profile-avatar.${avatar.type.split('/')[1]}`,
          type: (avatar as FileUriData).type,
          size: (avatar as FileUriData).size,
          file: Buffer.from(''),
        } as ShadowFile)
      } else {
        filesToUpload.push(new File(
          [convertDataUriToBlob((avatar as FileData).base64)],
          `profile-avatar.${avatar.type.split('/')[1]}`,
        ))
      }
    }

    // Find spling pda.
    const [SplingPDA] = web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('spling')],
      programId,
    )

    // Find/Create shadow drive account.
    const account: StorageAccountResponse = await getOrCreateShadowDriveAccount(this.shadowDrive, fileSizeSummarized)

    // Generate the user profile json.
    const userProfileJson: UserFileData = {
      timestamp: dayjs().unix().toString(),
      nickname: nickname,
      bio: biography ? biography : '',
      avatar: avatar
        ? ({
          file: `profile-avatar.${avatar.type.split('/')[1]}`,
          type: avatar.type.split('/')[1],
        } as MediaData)
        : null,
      banner: null,
      socials: [],
      license: null,
      metadata: metadataObject
    }

    if (!isBrowser) {
      const RNFS = require('react-native-fs')
      const profileJSONPath = `${RNFS.DocumentDirectoryPath}/profile.json`
      await RNFS.writeFile(profileJSONPath, JSON.stringify(userProfileJson), 'utf8')
      const statResult = await RNFS.stat(profileJSONPath)
      const file = await RNFS.readFile(profileJSONPath, 'utf8')

      filesToUpload.push({
        uri: `file://${profileJSONPath}`,
        type: 'application/json',
        file: Buffer.from(file, 'utf8'),
        name: 'profile.json',
        size: statResult.size,
      } as ShadowFile)
    } else {
      const fileToSave = new Blob([JSON.stringify(userProfileJson)], { type: 'application/json' })
      filesToUpload.push(new File([fileToSave], 'profile.json'))
    }

    // Find the user profile pda.
    const [UserProfilePDA] = web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('user_profile'), this.wallet.publicKey.toBuffer()],
      programId,
    )

    // Find bank pda.
    const [BankPDA] = web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('b')],
      programId,
    )

    // Upload all files to shadow drive once.
    await this.shadowDrive.uploadFiles(account.publicKey, !isBrowser ? filesToUpload as ShadowFile[] : filesToUpload as File[])

    // Remove created .json file on mobile device.
    if (!isBrowser) {
      const RNFS = require('react-native-fs')
      RNFS.unlink(`${RNFS.DocumentDirectoryPath}/profile.json`)
    }

    const transactionCosts = this.tokenAccount !== null ? new anchor.BN(6458000) : null
    await submitUserProfileToAnchorProgram(
      this.anchorProgram,
      this.wallet.publicKey,
      account.publicKey,
      this.tokenAccount,
      SplingPDA,
      UserProfilePDA,
      BankPDA,
      transactionCosts
    )

    // Fetch the user profile from the anchor program.
    let userProfile = null
    while (userProfile == null) {
      try {
        userProfile = await this.anchorProgram.account.userProfile.fetch(UserProfilePDA)
      } catch (error) {
        // Nothing to do here.
      }
    }
    const userChain = new UserChain(userProfile)

    return Promise.resolve({
      timestamp: userChain.timestamp,
      publicKey: userChain.publicKey,
      userId: userChain.userId,
      status: userChain.status,
      shdw: account.publicKey,
      following: [],
      groups: [],
      nickname: nickname,
      bio: biography ? biography : '',
      avatar: avatar
        ? `${shadowDriveDomain}${account.publicKey}/${userProfileJson.avatar.file}`
        : null,
      banner: null,
      socials: userProfileJson.socials,
      license: userProfileJson.license,
      metadata: metadataObject
    } as User)
  } catch (error) {
    return Promise.reject(error)
  }
}

// Submit the user profile to the anchor program.
async function submitUserProfileToAnchorProgram(
  anchorProgram: anchor.Program<SocialIDL>,
  walletPublicKey: web3.PublicKey,
  accountPublicKey: web3.PublicKey,
  senderTokenAccount: web3.PublicKey,
  SplingPDA: web3.PublicKey,
  UserProfilePDA: web3.PublicKey,
  BankPDA: web3.PublicKey,
  transactionCosts: any
): Promise<string> {
  return anchorProgram.methods
    .createUserProfile(accountPublicKey, transactionCosts)
    .accounts({
      user: walletPublicKey,
      spling: SplingPDA,
      userProfile: UserProfilePDA,
      systemProgram: anchor.web3.SystemProgram.programId,
      b: BankPDA,
      receiver: walletPublicKey,
      senderTokenAccount: senderTokenAccount ?? new PublicKey('2cDKYNjMNcDCxxxF7rauq8DgvNXD9r9BVLzKShPrJGUw'),
      receiverTokenAccount: SPLING_TOKEN_ACCOUNT_RECEIVER,
      mint: SPLING_TOKEN_ADDRESS,
      tokenProgram: TOKEN_PROGRAM_ID,
    })
    .rpc()
}
