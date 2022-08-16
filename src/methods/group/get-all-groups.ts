import { programId, shadowDriveDomain } from '../../utils/constants'
import { GroupChain } from '../../models/GroupChain'
import { Group, GroupFileData } from '../../types'
import { getGroupFileData } from './helpers'
import * as anchor from '@project-serum/anchor'
import { web3 } from '@project-serum/anchor'

/**
 * @category Group
 */
export default async function getAllGroups(): Promise<Group[]> {
  try {
    // Find the stats pda.
    const [StatsPDA] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('stats')],
      programId,
    )

    // Fetch the stats.
    const stats = await this.anchorProgram.account.stats.fetch(StatsPDA)
    const groupsNumber: number = stats.groups

    const groups: Group[] = []
    for (let groupId = 1; groupId <= groupsNumber; groupId++) {
      try {
        // Find the group profile pda.
        const [GroupProfilePDA] = await web3.PublicKey.findProgramAddress(
          [
            anchor.utils.bytes.utf8.encode('group_profile'),
            anchor.utils.bytes.utf8.encode(groupId.toString()),
          ],
          programId,
        )

        // Fetch the group profile.
        const group = await this.anchorProgram.account.groupProfile.fetch(GroupProfilePDA)
        const groupChain = new GroupChain(GroupProfilePDA, group)

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
