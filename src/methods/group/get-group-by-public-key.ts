import { shadowDriveDomain } from '../../utils/constants'
import { GroupChain } from '../../models'
import { Group, GroupFileData } from '../../types'
import { getGroupFileData } from './helpers'
import { web3 } from 'react-native-project-serum-anchor'

/**
 * @category Group
 * @param web3.PublicKey - the public key of the group
 */
export default async function getGroupByPublicKey(
  publicKey: web3.PublicKey,
): Promise<Group | null> {
  try {
    // Fetch the group by public key.
    const groupProfile = await this.anchorProgram.account.groupProfile.fetch(publicKey)
    const groupChain = new GroupChain(publicKey, groupProfile)

    const groupFileData: GroupFileData = await getGroupFileData(groupChain.shdw)

    return Promise.resolve({
      timestamp: groupChain.timestamp,
      publicKey: publicKey,
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
    if (error.message.includes('Account does not exist')) return Promise.resolve(null)
    return Promise.reject(error)
  }
}
