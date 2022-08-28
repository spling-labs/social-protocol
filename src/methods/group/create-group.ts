import { convertDataUriToBlob, getOrCreateShadowDriveAccount } from '../../utils/helpers'
import { FileData, Group, GroupFileData, MediaData } from '../../types'
import { web3 } from '@project-serum/anchor'
import * as anchor from '@project-serum/anchor'
import { programId, shadowDriveDomain } from '../../utils/constants'
import { StorageAccountResponse } from '@shadow-drive/sdk'
import { GroupChain } from '../../models'
import dayjs from 'dayjs'

/**
 * @category Group
 */
export default async function createGroup(
  name: string,
  bio: string | null,
  avatar: FileData | null,
): Promise<Group> {
  try {
    // Generate avatar file to upload.
    const avatarUploadFile = avatar
      ? new File([convertDataUriToBlob(avatar.base64)], `group.${avatar?.type.split('/')[1]}`)
      : null

    let fileSizeSummarized = 1024 // 1024 bytes will be reserved for the group.json.

    // Summarize size of files.
    if (avatarUploadFile != null) {
      fileSizeSummarized += avatarUploadFile.size
    }

    // Find/Create shadow drive account.
    const account: StorageAccountResponse = await getOrCreateShadowDriveAccount(
      this.shadowDrive,
      fileSizeSummarized,
    )

    const filesToUpload: File[] = []

    // Upload avatar file to shadow drive.
    if (avatarUploadFile != null) {
      filesToUpload.push(avatarUploadFile)
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
    const fileToSave = new Blob([JSON.stringify(groupJson)], {
      type: 'application/json',
    })
    const groupUploadFile = new File([fileToSave], 'group.json')
    filesToUpload.push(groupUploadFile)

    // Upload all files to shadow drive.
    await this.shadowDrive.uploadMultipleFiles(account.publicKey, filesToUpload, 'v2')

    // Find the spling pda.
    const [SplingPDA] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('spling')],
      programId,
    )

    // Find the group profile pda.
    const [GroupProfilePDA] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('group_profile'), this.wallet.publicKey.toBuffer()],
      programId,
    )

    // Submit the group to the anchor program.
    await this.anchorProgram.methods
      .createGroupProfile(account.publicKey)
      .accounts({
        user: this.wallet.publicKey,
        groupProfile: GroupProfilePDA,
        spling: SplingPDA,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc()

    // Fetch the group profile from the anchor program.
    const groupProfile = await this.anchorProgram.account.groupProfile.fetch(GroupProfilePDA)
    const groupChain = new GroupChain(groupProfile.publicKey, groupProfile)

    return Promise.resolve({
      timestamp: groupChain.timestamp,
      publicKey: groupChain.publicKey,
      group: groupChain.group,
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
