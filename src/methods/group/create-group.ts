import { convertDataUriToBlob, getOrCreateShadowDriveAccount, isValidAvatar } from '../../utils/helpers'
import { FileData, FileUriData, Group, GroupFileData, MediaData } from '../../types'
import { web3 } from '@project-serum/anchor'
import * as anchor from '@project-serum/anchor'
import { isBrowser, programId, shadowDriveDomain, SPLING_TOKEN_ACCOUNT_RECEIVER, SPLING_TOKEN_ADDRESS } from '../../utils/constants'
import { ShadowFile, StorageAccountResponse } from 'react-native-shadow-drive'
import { GroupChain } from '../../models'
import dayjs from 'dayjs'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { PublicKey } from '@solana/web3.js'
import InvalidAvatarType from '../../utils/errors/InvalidAvatarType'

/**
 * Creates a new group.
 * 
 * @category Group
 * 
 * @param {string} name The name of the group.
 * @param {string | null} bio An optional description of the group.
 * @param {FileData | FileUriData | null} avatar An optional avatar for the group. Can be a FileData, FileUriData, or null.
 * @param {any | null} metadata - An json object containing any relevant metadata to be associated with the group.
 * 
 * @returns A Promise that resolves with the newly created group.
 */
export default async function createGroup(
  name: string,
  bio: string | null,
  avatar: FileData | FileUriData | null,
  metadata: any | null = null,
): Promise<Group> {
  try {
    // Check if metadata object is a valid json.
    const metadataObject: any | null = metadata ? JSON.parse(JSON.stringify(metadata)) : null
    if (typeof metadataObject !== 'object') throw new Error('Invalid JSON object')

    // Check if avatar file type is valid.
    if (avatar !== null && !isValidAvatar(avatar)) throw new InvalidAvatarType()

    let fileSizeSummarized = 1024 // 1024 bytes will be reserved for the userProfile.json.
    const filesToUpload: any[] = []

    // Generate avatar file to upload.
    if (avatar !== null) {
      fileSizeSummarized += avatar.size

      if (!isBrowser) {
        const RNFS = require('react-native-fs')
        const readedFile = await RNFS.readFile((avatar as FileUriData).uri, 'base64')

        filesToUpload.push({
          uri: (avatar as FileUriData).uri,
          name: `group-avatar.${avatar?.type.split('/')[1]}`,
          type: (avatar as FileUriData).type,
          size: (avatar as FileUriData).size,
          file: Buffer.from(readedFile, 'base64'),
        } as ShadowFile)
      } else {
        filesToUpload.push(new File(
          [convertDataUriToBlob((avatar as FileData).base64)],
          `group-avatar.${avatar?.type.split('/')[1]}`,
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

    // Generate the group json.
    const groupJson: GroupFileData = {
      timestamp: dayjs().unix().toString(),
      name: name,
      bio: bio ? bio : '',
      avatar: avatar
        ? ({
          file: `group-avatar.${avatar.type.split('/')[1]}`,
          type: avatar.type.split('/')[1],
        } as MediaData)
        : null,
      banner: null,
      license: null,
      metadata: metadataObject
    }

    if (!isBrowser) {
      const RNFS = require('react-native-fs')
      const groupJSONPath = `${RNFS.DocumentDirectoryPath}/group.json`
      await RNFS.writeFile(groupJSONPath, JSON.stringify(groupJson), 'utf8')
      const statResult = await RNFS.stat(groupJSONPath)
      const file = await RNFS.readFile(groupJSONPath, 'utf8')

      filesToUpload.push({
        uri: `file://${groupJSONPath}`,
        type: 'application/json',
        file: Buffer.from(file, 'utf8'),
        name: 'group.json',
        size: statResult.size,
      } as ShadowFile)
    } else {
      const fileToSave = new Blob([JSON.stringify(groupJson)], { type: 'application/json' })
      filesToUpload.push(new File([fileToSave], 'group.json'))
    }

    // Upload all files to shadow drive once.
    await this.shadowDrive.uploadFiles(account.publicKey, !isBrowser ? filesToUpload as ShadowFile[] : filesToUpload as File[])

    // Remove created .json file on mobile device.
    if (!isBrowser) {
      const RNFS = require('react-native-fs')
      RNFS.unlink(`${RNFS.DocumentDirectoryPath}/group.json`)
    }

    // Find the group profile pda.
    const [GroupProfilePDA] = web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('group_profile'), this.wallet.publicKey.toBuffer()],
      programId,
    )

    // Find bank pda.
    const [BankPDA] = web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('b')],
      programId,
    )

    // Submit the group to the anchor program.
    const transactionCosts = this.tokenAccount !== null ? new anchor.BN(1513360) : null
    await this.anchorProgram.methods
      .createGroupProfile(account.publicKey, transactionCosts)
      .accounts({
        user: this.wallet.publicKey,
        groupProfile: GroupProfilePDA,
        spling: SplingPDA,
        b: BankPDA,
        receiver: this.wallet.publicKey,
        senderTokenAccount: this.tokenAccount ?? new PublicKey('2cDKYNjMNcDCxxxF7rauq8DgvNXD9r9BVLzKShPrJGUw'),
        receiverTokenAccount: SPLING_TOKEN_ACCOUNT_RECEIVER,
        mint: SPLING_TOKEN_ADDRESS,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc()

    // Fetch the group profile from the anchor program.
    let groupProfile = null
    while (groupProfile == null) {
      try {
        groupProfile = await this.anchorProgram.account.groupProfile.fetch(GroupProfilePDA)
      } catch (error) {
        // Nothing to do here.
      }
    }
    const groupChain = new GroupChain(GroupProfilePDA, groupProfile)

    return Promise.resolve({
      timestamp: groupChain.timestamp,
      publicKey: groupChain.publicKey,
      groupId: groupChain.groupId,
      status: groupChain.status,
      shdw: account.publicKey,
      name: name,
      bio: bio,
      avatar: avatar
        ? `${shadowDriveDomain}${account.publicKey}/${groupJson.avatar.file}`
        : null,
      banner: null,
      license: groupJson.license,
      metadata: metadataObject
    } as Group)
  } catch (error) {
    return Promise.reject(error)
  }
}
