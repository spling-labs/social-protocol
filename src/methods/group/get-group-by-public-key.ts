import { shadowDriveDomain } from '../../utils/constants'
import { GroupChain } from '../../models'
import { Group, GroupFileData } from '../../types'
import { getGroupFileData } from './helpers'
import { web3 } from 'react-native-project-serum-anchor'
import { GetGroupByPublicKeyQuery, Splinglabs_0_1_0_Decoded_Groupprofile } from '../../gql/graphql'
import { GetGroupByPublicKeyQueryDocument } from '../../utils/gql/group'
import { GroupNotFoundError } from '../../utils/errors'

/**
 * @category Group
 * @param web3.PublicKey - the public key of the group
 */
export default async function getGroupByPublicKey(publicKey: web3.PublicKey): Promise<Group | null> {
  try {
    if (this.graphQLClient !== null) {
      const groupQuery: GetGroupByPublicKeyQuery = await this.graphQLClient.request(GetGroupByPublicKeyQueryDocument, { publicKey: publicKey.toString() })
      const groupChain: Splinglabs_0_1_0_Decoded_Groupprofile | null = groupQuery.splinglabs_0_1_0_decoded_groupprofile_by_pk
      if (groupChain === null) throw new GroupNotFoundError()

      const groupPublicKey: web3.PublicKey = new web3.PublicKey(groupChain.cl_pubkey)
      const groupShdwPublicKey: web3.PublicKey = new web3.PublicKey(groupChain.shdw)
      const groupFileData: GroupFileData = await getGroupFileData(groupShdwPublicKey)

      return Promise.resolve({
        timestamp: groupChain.ts,
        publicKey: groupPublicKey,
        groupId: groupChain.gid,
        status: groupChain.st,
        shdw: groupShdwPublicKey,
        name: groupFileData.name,
        bio: groupFileData.bio,
        avatar:
          groupFileData.avatar != null
            ? `${shadowDriveDomain}${groupChain.shdw.toString()}/${groupFileData.avatar.file}`
            : null,
        banner: null,
        license: groupFileData.license,
      } as Group)
    } else {
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
    }
  } catch (error) {
    if (error.message.includes('Account does not exist') || error instanceof GroupNotFoundError) return Promise.resolve(null)
    return Promise.reject(error)
  }
}
