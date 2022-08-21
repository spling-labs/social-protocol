import { shadowDriveDomain } from '../../utils/constants'
import { GroupChain } from '../../models'
import { Group, GroupFileData } from '../../types'
import { getGroupFileData } from './helpers'
import { convertNumberToBase58 } from '../../utils/helpers'
import { GroupNotFoundError } from '../../utils/errors'

/**
 * @category Group
 * @param groupId - the id of the group
 */
export default async function getGroup(groupId: string): Promise<Group> {
  try {
    // Fetch the group by groupId.
    const onChainGroupProfiles = await this.anchorProgram.account.groupProfile.all([
      {
        memcmp: {
          offset:
            8 + // Discriminator
            8 + // Timestamp
            32, // group
          bytes: convertNumberToBase58(Number(groupId)),
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
      group: groupChain.group,
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
    return Promise.reject(error)
  }
}
