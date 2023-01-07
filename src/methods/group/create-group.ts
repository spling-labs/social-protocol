import { convertDataUriToBlob, getOrCreateShadowDriveAccount } from '../../utils/helpers'
import { FileData, FileUriData, Group, GroupFileData, MediaData } from '../../types'
import { web3 } from 'react-native-project-serum-anchor'
import * as anchor from 'react-native-project-serum-anchor'
import { isBrowser, programId, shadowDriveDomain, SPLING_TOKEN_ACCOUNT_RECEIVER, SPLING_TOKEN_ADDRESS } from '../../utils/constants'
import { ShadowFile, StorageAccountResponse } from 'react-native-shadow-drive'
import { GroupChain } from '../../models'
import dayjs from 'dayjs'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'

/**
 * Creates a new group.
 * 
 * @category Group
 * 
 * @param {string} name The name of the group.
 * @param {string | null} bio An optional description of the group.
 * @param {FileData | FileUriData | null} avatar An optional avatar for the group. Can be a FileData, FileUriData, or null.
 * 
 * @returns A Promise that resolves with the newly created group.
 */
export default async function createGroup(
  name: string,
  bio: string | null,
  avatar: FileData | FileUriData | null,
): Promise<Group> {
  try {
    // Generate avatar file to upload.
    let avatarUploadFile
    if (!isBrowser) {
      avatarUploadFile = avatar
        ? ({
          uri: (avatar as FileUriData).uri,
          name: `group-avatar.${avatar?.type.split('/')[1]}`,
          type: (avatar as FileUriData).type,
          size: (avatar as FileUriData).size,
          file: Buffer.from(''),
        } as ShadowFile)
        : null
    } else {
      avatarUploadFile = avatar
        ? new File(
          [convertDataUriToBlob((avatar as FileData).base64)],
          `group-avatar.${avatar?.type.split('/')[1]}`,
        )
        : null
    }

    let fileSizeSummarized = 1024 // 1024 bytes will be reserved for the group.json.

    // Summarize size of files.
    if (avatarUploadFile != null) {
      fileSizeSummarized += avatarUploadFile.size
    }

    // Find spling pda.
    const [SplingPDA] = web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('spling')],
      programId,
    )

    // Find/Create shadow drive account.
    const account: StorageAccountResponse = await getOrCreateShadowDriveAccount(
      this.shadowDrive,
      fileSizeSummarized,
    )

    // Upload avatar file to shadow drive.
    if (avatarUploadFile != null) {
      await this.shadowDrive.uploadFile(
        account.publicKey,
        !isBrowser ? (avatarUploadFile as ShadowFile) : (avatarUploadFile as File),
      )
    }

    // Generate the group json.
    const groupJson: GroupFileData = {
      timestamp: dayjs().unix().toString(),
      name: name,
      bio: bio ? bio : '',
      avatar: avatarUploadFile
        ? ({
          file: `group-avatar.${avatar.type.split('/')[1]}`,
          type: avatar.type.split('/')[1],
        } as MediaData)
        : null,
      banner: null,
      license: null,
    }

    if (!isBrowser) {
      const RNFS = require('react-native-fs')
      const groupJSONPath = `${RNFS.DocumentDirectoryPath}/group.json`
      await RNFS.writeFile(groupJSONPath, JSON.stringify(groupJson), 'utf8')
      const statResult = await RNFS.stat(groupJSONPath)
      const file = await RNFS.readFile(groupJSONPath, 'utf8')

      const profileFile: ShadowFile = {
        uri: `file://${groupJSONPath}`,
        type: 'application/json',
        file: Buffer.from(file, 'utf8'),
        name: 'group.json',
        size: statResult.size,
      }

      await this.shadowDrive.uploadFile(account.publicKey, profileFile)
      await RNFS.unlink(groupJSONPath)
    } else {
      const fileToSave = new Blob([JSON.stringify(groupJson)], { type: 'application/json' })
      const groupJSONFile = new File([fileToSave], 'group.json')
      await this.shadowDrive.uploadFile(account.publicKey, groupJSONFile)
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
        senderTokenAccount: this.tokenAccount,
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
      avatar: avatarUploadFile
        ? `${shadowDriveDomain}${account.publicKey}/${groupJson.avatar.file}`
        : null,
      banner: null,
      license: groupJson.license,
    } as Group)
  } catch (error) {
    return Promise.reject(error)
  }
}
