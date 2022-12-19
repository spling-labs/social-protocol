import { graphql } from '../../gql/gql';

export const GetAllLikesByPublicKeyQueryDocument = graphql(`
    query GetAllLikesByPublicKey($publicKey: String!) {
        splinglabs_0_1_0_decoded_likes_by_pk(cl_pubkey: $publicKey) {
            counter
            users
        }
    }      
`);
