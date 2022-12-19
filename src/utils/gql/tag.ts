import { graphql } from '../../gql/gql';

export const GetAllTagsByPublicKeyQueryDocument = graphql(`
    query GetAllTagsByPublicKey($publicKey: String!) {
        splinglabs_0_1_0_decoded_tags_by_pk(cl_pubkey: $publicKey) {
            taglist
        }
    }      
`);
