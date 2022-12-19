import { programId, shadowDriveDomain } from '../../utils/constants'
import { GroupChain } from '../../models'
import { Group, GroupFileData } from '../../types'
import { getGroupFileData } from './helpers'
import * as anchor from 'react-native-project-serum-anchor'
import { web3 } from 'react-native-project-serum-anchor'
import { GetGroupByPublicKeyQueryDocument } from '../../utils/gql/group'
import { GetGroupByPublicKeyQuery, Splinglabs_0_1_0_Decoded_Groupprofile } from '../../gql/graphql'
import { GroupNotFoundError } from '../../utils/errors'

/**
 * Retrieves the group associated with a given user public key.
 * 
 * @category Group
 * 
 * @param {web3.PublicKey} publicKey - The public key of the user to retrieve the group for.
 * 
 * @returns {Promise<Group | null>} - A promise that resolves to the group, or null if no group was found.
 */
export default async function getUserGroup(publicKey: web3.PublicKey): Promise<Group | null> {
  try {
    // Find the group profile pda.
    const [GroupProfilePDA] = web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('group_profile'), publicKey.toBuffer()],
      programId,
    )

    if (this.graphQLClient !== null) {
      const groupQuery: GetGroupByPublicKeyQuery = await this.graphQLClient.request(GetGroupByPublicKeyQueryDocument, { publicKey: GroupProfilePDA.toString() })
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
      // Fetch the group profile.
      const onChainGroupProfile = await this.anchorProgram.account.groupProfile.fetch(GroupProfilePDA)
      const groupChain = new GroupChain(GroupProfilePDA, onChainGroupProfile)

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
    }
  } catch (error) {
    if (error.message.includes('Account does not exist') || error instanceof GroupNotFoundError) return Promise.resolve(null)
    else return Promise.reject(error)
  }
}
