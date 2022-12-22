import { graphql } from '../../gql/gql';

export const GetUserByUserIdQueryDocument = graphql(`
    query GetUserByUserId($userId: bigint!) {
        splinglabs_0_1_0_decoded_userprofile(where: {uid: {_eq: $userId}}) {
            cl_pubkey    
            following
            groups
            shdw
            st
            ts
            uid
            username
        }
    }      
`);

export const GetUserByPublicKeyQueryDocument = graphql(`
    query GetUserByPublicKey($publicKey: String!) {
        splinglabs_0_1_0_decoded_userprofile_by_pk(cl_pubkey: $publicKey) {
            cl_pubkey    
            following
            groups
            shdw
            st
            ts
            uid
            username
        }
    }
`);

export const GetAllUserByUserIdQueryDocument = graphql(`
    query GetAllUserByUserId($userIds: [bigint!]!) {
        splinglabs_0_1_0_decoded_userprofile(where: {uid: {_in: $userIds}}) {
            cl_pubkey
            following
            groups
            shdw
            st
            ts
            uid
            username
        }
    }
`);
