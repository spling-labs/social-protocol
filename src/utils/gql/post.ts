import { graphql } from '../../gql/gql';

export const GetAllPostByGroupIdQueryDocument = graphql(`
    query GetAllPostByGroupId($limit: Int, $offset: Int, $groupId: bigint!, $orderBy: order_by) {
        splinglabs_0_1_0_decoded_post(limit: $limit, offset: $offset, where: {gid: {_eq: $groupId}}, order_by: {ts: $orderBy}) {
        cl_pubkey    
        gid
        pid
        st
        tid
        ts
        uid
        }
    }      
`);

export const GetPostByPublicKeyQueryDocument = graphql(`
    query GetPostByPublicKey($publicKey: String!) {
        splinglabs_0_1_0_decoded_post_by_pk(cl_pubkey: $publicKey) {
            cl_pubkey    
            gid
            pid
            st
            tid
            ts
            uid
        }
    }
`);

export const GetPostByIdQueryDocument = graphql(`
    query GetPostById($postId: bigint!) {
        splinglabs_0_1_0_decoded_post(where: {pid: {_eq: $postId}}) {
            cl_pubkey    
            gid
            pid
            st
            tid
            ts
            uid
        }
    }
`);
