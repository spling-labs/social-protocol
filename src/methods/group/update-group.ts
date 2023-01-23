import { convertDataUriToBlob, isValidAvatar } from '../../utils/helpers'
import { FileData, FileUriData, Group, GroupFileData, MediaData } from '../../types'
import * as anchor from '@project-serum/anchor'
import { web3 } from '@project-serum/anchor'
import { isBrowser, programId, shadowDriveDomain } from '../../utils/constants'
import { ShadowFile } from 'react-native-shadow-drive'
import { GroupChain } from '../../models'
import { getGroupFileData } from './helpers'
import InvalidAvatarType from '../../utils/errors/InvalidAvatarType'

/**
 * Update a user group with the given parameters.
 * 
 * @category Group
 * 
 * @param {string | null} name - The name of the group to be updated.
 * @param {FileData | FileUriData | null} avatar - The avatar of the group to be updated. Can be a FileData object, a FileUriData object, or null.
 * @param {string | null} biography - The biography for the group to be updated. Can be a string or null.
 * @param {any | null} metadata - An updated json object containing any relevant metadata to be associated with the group.
 * 
 * @returns {Promise<Group>} A promise that resolves to the newly created user.
 */
export default async function updateGroup(
  name: string | null = null,
  avatar: FileData | FileUriData | null = null,
  biography: string | null = null,
  metadata: any | null = null,
): Promise<Group> {
  try {
    // Check if metadata object is a valid json.
    const metadataObject: any | null = metadata ? JSON.parse(JSON.stringify(metadata)) : null
    if (typeof metadataObject !== 'object') throw new Error('Invalid JSON object')

    // Check if avatar file type is valid.
    if (avatar !== null && !isValidAvatar(avatar)) throw new InvalidAvatarType()

    // Find the group profile pda.
    const [GroupProfilePDA] = web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('group_profile'), this.wallet.publicKey.toBuffer()],
      programId,
    )

    // Fetch the group profile from the anchor program.
    const onChainProfile = await this.anchorProgram.account.groupProfile.fetch(GroupProfilePDA)
    const groupChain = new GroupChain(GroupProfilePDA, onChainProfile)

    // Get group profile json file from the shadow drive.
    const groupProfileJson: GroupFileData = await getGroupFileData(groupChain.shdw)

    // Generate avatar file to upload.
    let groupAvatarFile = null

    if (avatar !== null) {
      if (!isBrowser) {
        const RNFS = require('react-native-fs')
        const readedFile = await RNFS.readFile((avatar as FileUriData).uri, 'base64')

        groupAvatarFile = {
          uri: (avatar as FileUriData).uri,
          name: `group-avatar.${avatar.type.split('/')[1]}`,
          type: (avatar as FileUriData).type,
          size: (avatar as FileUriData).size,
          file: Buffer.from(readedFile, 'base64'),
        } as ShadowFile
      } else {
        groupAvatarFile = new File(
          [convertDataUriToBlob((avatar as FileData).base64)],
          `group-avatar.${avatar.type.split('/')[1]}`,
        )
      }
    }

    if (groupAvatarFile != null) {
      // Edit avatar image from shadow drive.
      if (groupProfileJson.avatar !== null && groupProfileJson.avatar.type === avatar.type.split('/')[1]) {
        await this.shadowDrive.editFile(
          groupChain.shdw,
          `${shadowDriveDomain}${groupChain.shdw.toString()}/${groupProfileJson.avatar.file}`,
          !isBrowser ? (groupAvatarFile as ShadowFile) : (groupAvatarFile as File),
          'v2'
        )
      } else {
        // Upload avatar image file to shadow drive.
        await this.shadowDrive.uploadFile(
          groupChain.shdw,
          !isBrowser ? (groupAvatarFile as ShadowFile) : (groupAvatarFile as File),
        )
      }
    }

    // Update effected group profile fields.
    if (name !== null) {
      groupProfileJson.name = name
    }

    if (biography !== null) {
      groupProfileJson.bio = biography
    }

    if (avatar !== null) {
      groupProfileJson.avatar = groupAvatarFile
        ? ({
          file: `group-avatar.${avatar.type.split('/')[1]}`,
          type: avatar.type.split('/')[1],
        } as MediaData)
        : null
    }

    if (metadata !== null) {
      groupProfileJson.metadata = metadataObject
    }

    let groupFile
    if (!isBrowser) {
      const RNFS = require('react-native-fs')
      const profileJSONPath = `${RNFS.DocumentDirectoryPath}/group.json`
      await RNFS.writeFile(profileJSONPath, JSON.stringify(groupProfileJson), 'utf8')
      const statResult = await RNFS.stat(profileJSONPath)
      const file = await RNFS.readFile(profileJSONPath, 'utf8')

      groupFile = {
        uri: `file://${profileJSONPath}`,
        type: 'application/json',
        file: Buffer.from(file, 'utf8'),
        name: 'group.json',
        size: statResult.size,
      } as ShadowFile
    } else {
      const fileToSave = new Blob([JSON.stringify(groupProfileJson)], { type: 'application/json' })
      groupFile = new File([fileToSave], 'group.json')
    }

    // Edit current group.json from 
    await this.shadowDrive.editFile(
      groupChain.shdw,
      `${shadowDriveDomain}${groupChain.shdw.toString()}/group.json`,
      !isBrowser ? (groupFile as ShadowFile) : (groupFile as File),
      'v2'
    )

    if (groupFile !== null && !isBrowser) {
      const RNFS = require('react-native-fs')
      RNFS.unlink(`${RNFS.DocumentDirectoryPath}/group.json`)
    }

    return Promise.resolve({
      timestamp: groupChain.timestamp,
      publicKey: groupChain.publicKey,
      groupId: groupChain.groupId,
      status: groupChain.status,
      shdw: groupChain.shdw,
      name: groupFile.name,
      bio: groupProfileJson.bio,
      avatar: groupProfileJson.avatar !== null
        ? `${shadowDriveDomain}${groupChain.shdw}/${groupProfileJson.avatar.file}`
        : null,
      banner: null,
      license: groupProfileJson.license,
      metadata: groupProfileJson.metadata
    } as Group)
  } catch (error) {
    return Promise.reject(error)
  }
}
