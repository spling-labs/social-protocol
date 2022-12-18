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
