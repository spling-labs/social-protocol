import * as anchor from '@project-serum/anchor'
import { web3 } from '@project-serum/anchor'
import { programId, shadowDriveDomain } from '../../utils/constants'
import { GroupChain } from '../../models'
import { Group, GroupFileData } from '../../types'
import { getGroupFileData } from './helpers'

/**
 * @category Group
 * @param groupId - the id of the group
 */
export default async function getGroup(groupId: string): Promise<Group> {
  try {
    // Find the group profile pda.
    const [GroupProfilePDA] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('group_profile'), anchor.utils.bytes.utf8.encode(groupId)],
      programId,
    )

    // Fetch the group profile.
    const group = await this.anchorProgram.account.groupProfile.fetch(GroupProfilePDA)
    const groupChain = new GroupChain(GroupProfilePDA, group)

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
