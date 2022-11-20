import { shadowDriveDomain } from '../../utils/constants'
import { GroupChain } from '../../models'
import { Group, GroupFileData } from '../../types'
import { getGroupFileData } from './helpers'
import { GroupNotFoundError } from '../../utils/errors'
import { bs58 } from 'react-native-project-serum-anchor/dist/cjs/utils/bytes'

/**
 * @category Group
 * @param groupId - the id of the group
 */
export default async function getGroup(groupId: number): Promise<Group | null> {
  try {
    // Fetch the group by groupId.
    const onChainGroupProfiles = await this.anchorProgram.account.groupProfile.all([
      {
        memcmp: {
          offset:
            8 + // Discriminator
            8 + // Timestamp
            32, // group
          bytes: bs58.encode(Uint8Array.from([groupId])),
        },
      },
    ])
    if (onChainGroupProfiles.length === 0) throw new GroupNotFoundError()

    const groupProfile = onChainGroupProfiles[0]
    const groupChain = new GroupChain(groupProfile.publicKey, groupProfile.account)

    const groupFileData: GroupFileData = await getGroupFileData(groupChain.shdw)

    return Promise.resolve({
      timestamp: groupChain.timestamp,
      publicKey: groupChain.publicKey,
      groupId: groupChain.groupId,
      status: groupChain.status,
      shdw: groupChain.shdw,
      name: groupFileData.name,
      bio: groupFileData.bio,
      avatar:
        groupFileData.avatar != null
          ? `${shadowDriveDomain}${groupChain.shdw.toString()}/${groupFileData.avatar.file}`
          : null,
      banner: null,
      license: groupFileData.license,
    } as Group)
  } catch (error) {
    if (error.message.includes('Account does not exist') || error instanceof GroupNotFoundError)
      return Promise.resolve(null)
    return Promise.reject(error)
  }
}
