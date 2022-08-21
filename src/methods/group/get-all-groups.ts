import { shadowDriveDomain } from '../../utils/constants'
import { GroupChain } from '../../models/GroupChain'
import { Group, GroupFileData } from '../../types'
import { getGroupFileData } from './helpers'

/**
 * @category Group
 */
export default async function getAllGroups(): Promise<Group[]> {
  try {
    // Fetch the groups.
    const onChainGroups = await this.anchorProgram.account.groupProfile.all()

    const groups: Group[] = []
    for (const g in onChainGroups) {
      try {
        const onChainGroup = onChainGroups[g]
        const groupChain = new GroupChain(onChainGroup.publicKey, onChainGroup.account)
        const groupFileData: GroupFileData = await getGroupFileData(groupChain.shdw)

        // Push group data to array.
        groups.push({
          timestamp: groupChain.timestamp,
          publicKey: groupChain.publicKey,
          group: groupChain.publicKey,
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
        // Nothing to do.
      }
    }
    return Promise.resolve(groups)
  } catch (error) {
    Promise.reject(error)
  }
}
