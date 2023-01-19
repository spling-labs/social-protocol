import { shadowDriveDomain } from '../../utils/constants'
import { GroupChain } from '../../models'
import { Group, GroupFileData } from '../../types'
import { getGroupFileData } from './helpers'
import { GroupNotFoundError } from '../../utils/errors'
import { bs58 } from '@project-serum/anchor/dist/cjs/utils/bytes'
import { GetGroupByIdQuery, Splinglabs_0_1_0_Decoded_Groupprofile } from '../../gql/graphql'
import { GetGroupByIdQueryDocument } from '../../utils/gql/group'
import { web3 } from '@project-serum/anchor'

/**
 * Retrieves a group associated with the id.
 * 
 * @category Group
 *
 * @param {number} groupId - The id of the group to retrieve.
 * 
 * @returns {Promise<Group | null>} - A promise that resolves to the group, or null if no group was found.
 */
export default async function getGroup(groupId: number): Promise<Group | null> {
  try {
    if (this.graphQLClient !== null) {
      const groupQuery: GetGroupByIdQuery = await this.graphQLClient.request(GetGroupByIdQueryDocument, { groupId: groupId })
      if (groupQuery.splinglabs_0_1_0_decoded_groupprofile.length <= 0) throw new GroupNotFoundError()

      const groupChain: Splinglabs_0_1_0_Decoded_Groupprofile = groupQuery.splinglabs_0_1_0_decoded_groupprofile[0]
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
        metadata: groupFileData.metadata,
      } as Group)
    } else {
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
        metadata: groupFileData.metadata,
      } as Group)
    }
  } catch (error) {
    if (error.message.includes('Account does not exist') || error instanceof GroupNotFoundError)
      return Promise.resolve(null)
    return Promise.reject(error)
  }
}
