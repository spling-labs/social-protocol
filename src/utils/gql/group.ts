import { graphql } from '../../gql/gql';

export const GetAllGroupsQueryDocument = graphql(`
    query GetAllGroups($limit: Int, $offset: Int, $orderBy: order_by) {
        splinglabs_0_1_0_decoded_groupprofile(limit: $limit, offset: $offset, order_by: {ts: $orderBy}) {
            cl_pubkey
            gid
            groupname
            shdw
            st
            ts
        }
    }      
`);

export const GetGroupByPublicKeyQueryDocument = graphql(`
    query GetGroupByPublicKey($publicKey: String!) {
        splinglabs_0_1_0_decoded_groupprofile_by_pk(cl_pubkey: $publicKey) {
            cl_pubkey
            gid
            groupname
            shdw
            st
            ts
        }
    }
`);

export const GetGroupByIdQueryDocument = graphql(`
    query GetGroupById($groupId: bigint!) {
        splinglabs_0_1_0_decoded_groupprofile(where: {gid: {_eq: $groupId}}) {
            cl_pubkey
            gid
            groupname
            shdw
            st
            ts
        }
    }
`);
