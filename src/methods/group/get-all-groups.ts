import { shadowDriveDomain } from '../../utils/constants'
import { GroupChain } from '../../models/GroupChain'
import { Group, GroupFileData, GroupFileDataV2 } from '../../types'
import { getGroupFileData, getGroupFileDataV2 } from './helpers'
import { GetAllGroupsQueryDocument } from '../../utils/gql/group'
import { GetAllGroupsQuery, Order_By, Splinglabs_0_1_0_Decoded_Groupprofile } from '../../gql/graphql'
import { web3 } from '@project-serum/anchor'
import { GroupNotFoundError } from '../../utils/errors'

/**
 *  Get all groups.
 * 
 * @category Group
 * 
 * @param {number|null} limit Maximum number of groups to return. (optional, requires useIndexer option to be enabled)
 * @param {number|null} offset Offset to start returning groups from. (optional, requires useIndexer option to be enabled)
 * @param {Order_By|null} orderBy The order to return groups by timestamp. (optional, requires useIndexer option to be enabled)
 * 
 * @return {Promise<Group[]>} - Promise resolving to an array of groups.
 */
export default async function getAllGroups(limit: number | null = null, offset: number | null = null, orderBy: Order_By | null = null): Promise<Group[]> {
  try {
    const groups: Group[] = []

    if (this.graphQLClient !== null) {
      const groupQuery: GetAllGroupsQuery = await this.graphQLClient.request(GetAllGroupsQueryDocument, { limit: limit, offset: offset, orderBy: orderBy })
      const onChainGroups: Splinglabs_0_1_0_Decoded_Groupprofile[] = groupQuery.splinglabs_0_1_0_decoded_groupprofile

      // Read all group files from shadow drives.
      let groupFiles: GroupFileDataV2[] = await Promise.all(onChainGroups.map(group => getGroupFileDataV2(group.gid, group.shdw)))
      groupFiles = groupFiles.filter(value => value !== null)

      for (const g in onChainGroups) {
        try {
          const onChainGroup: Splinglabs_0_1_0_Decoded_Groupprofile = onChainGroups[g]
          const groupPublicKey: web3.PublicKey = new web3.PublicKey(onChainGroup.cl_pubkey)
          const groupShdwPublicKey: web3.PublicKey = new web3.PublicKey(onChainGroup.shdw)
          const groupFileData: GroupFileDataV2 | undefined = groupFiles.find(groupFile => groupFile.groupId == onChainGroup.gid)
          if (groupFileData == undefined) throw new GroupNotFoundError()

          // Push group data to array.
          groups.push({
            timestamp: onChainGroup.ts,
            publicKey: groupPublicKey,
            groupId: onChainGroup.gid,
            status: onChainGroup.st,
            shdw: groupShdwPublicKey,
            name: groupFileData.name,
            bio: groupFileData.bio,
            avatar:
              groupFileData.avatar != null
                ? `${shadowDriveDomain}${onChainGroup.shdw}/${groupFileData.avatar.file}`
                : null,
            banner: null,
            license: groupFileData.license,
            metadata: groupFileData.metadata,
          } as Group)
        } catch (error) {
          // Nothing to do.
        }
      }
    } else {
      // Fetch the groups.
      const onChainGroups = await this.anchorProgram.account.groupProfile.all()

      for (const g in onChainGroups) {
        try {
          const onChainGroup = onChainGroups[g]
          const groupChain = new GroupChain(onChainGroup.publicKey, onChainGroup.account)
          const groupFileData: GroupFileData = await getGroupFileData(groupChain.shdw)

          // Push group data to array.
          groups.push({
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
            metadata: groupFileData.metadata,
          } as Group)
        } catch (error) {
          // Nothing to do.
        }
      }
    }
    return Promise.resolve(groups)
  } catch (error) {
    Promise.reject(error)
  }
}
