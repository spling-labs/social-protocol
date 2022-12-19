import { graphql } from '../../gql/gql';

export const GetAllRepliesByPostIdQueryDocument = graphql(`
    query GetAllRepliesByPostId($limit: Int, $offset: Int, $postId: bigint!, $orderBy: order_by) {
        splinglabs_0_1_0_decoded_reply(limit: $limit, offset: $offset, where: {pid: {_eq: $postId}}, order_by: {ts: $orderBy}) {
            cl_pubkey
            pid
            st
            ts
            uid
        }
    }      
`);

export const GetReplyByPublicKeyQueryDocument = graphql(`
    query GetReplyByPublicKey($publicKey: String!) {
        splinglabs_0_1_0_decoded_reply_by_pk(cl_pubkey: $publicKey) {
            cl_pubkey
            pid
            st
            ts
            uid
        }
    }
`);
