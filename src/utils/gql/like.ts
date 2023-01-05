import { graphql } from '../../gql/gql';

export const GetAllLikesByPublicKeyQueryDocument = graphql(`
    query GetAllLikesByPublicKey($publicKey: String!) {
        splinglabs_0_1_0_decoded_likes_by_pk(cl_pubkey: $publicKey) {
            counter
            users
        }
    }      
`);

export const GetAllLikesByPublicKeysQueryDocument = graphql(`
    query GetAllLikesByPublicKeys($publicKeys: [String!]!) {
        splinglabs_0_1_0_decoded_likes(where: {cl_pubkey: {_in: $publicKeys}}) {
            cl_pubkey
            counter
            users
        }
    }
`);
