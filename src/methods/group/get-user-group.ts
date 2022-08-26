import { programId, shadowDriveDomain } from '../../utils/constants'
import { GroupChain } from '../../models'
import { Group, GroupFileData } from '../../types'
import { getGroupFileData } from './helpers'
import { GroupNotFoundError } from '../../utils/errors'
import * as anchor from '@project-serum/anchor'
import { web3 } from '@project-serum/anchor'

/**
 * @category Group
 * @param publicKey - the public key of the user.
 */
export default async function getUserGroup(publicKey: web3.PublicKey): Promise<Group> {
  try {
    // Find the group profile pda.
    const [GroupProfilePDA] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('group_profile'), publicKey.toBuffer()],
      programId,
    )

    // Fetch the group profile.
    const onChainGroupProfile = await this.anchorProgram.account.groupProfile.fetch(GroupProfilePDA)
    const groupChain = new GroupChain(GroupProfilePDA, onChainGroupProfile)

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
    if (error.message.includes('Account does not exist'))
      return Promise.reject(new GroupNotFoundError())
    else return Promise.reject(error)
  }
}
