/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n    query GetAllGroups($limit: Int, $offset: Int, $orderBy: order_by) {\n        splinglabs_0_1_0_decoded_groupprofile(limit: $limit, offset: $offset, order_by: {ts: $orderBy}) {\n            cl_pubkey\n            gid\n            groupname\n            shdw\n            st\n            ts\n        }\n    }      \n": types.GetAllGroupsDocument,
    "\n    query GetGroupByPublicKey($publicKey: String!) {\n        splinglabs_0_1_0_decoded_groupprofile_by_pk(cl_pubkey: $publicKey) {\n            cl_pubkey\n            gid\n            groupname\n            shdw\n            st\n            ts\n        }\n    }\n": types.GetGroupByPublicKeyDocument,
    "\n    query GetGroupById($groupId: bigint!) {\n        splinglabs_0_1_0_decoded_groupprofile(where: {gid: {_eq: $groupId}}) {\n            cl_pubkey\n            gid\n            groupname\n            shdw\n            st\n            ts\n        }\n    }\n": types.GetGroupByIdDocument,
    "\n    query GetAllLikesByPublicKey($publicKey: String!) {\n        splinglabs_0_1_0_decoded_likes_by_pk(cl_pubkey: $publicKey) {\n            counter\n            users\n        }\n    }      \n": types.GetAllLikesByPublicKeyDocument,
    "\n    query GetAllPostByGroupId($limit: Int, $offset: Int, $groupId: bigint!, $orderBy: order_by) {\n        splinglabs_0_1_0_decoded_post(limit: $limit, offset: $offset, where: {gid: {_eq: $groupId}}, order_by: {ts: $orderBy}) {\n        cl_pubkey    \n        gid\n        pid\n        st\n        tid\n        ts\n        uid\n        }\n    }      \n": types.GetAllPostByGroupIdDocument,
    "\n    query GetPostByPublicKey($publicKey: String!) {\n        splinglabs_0_1_0_decoded_post_by_pk(cl_pubkey: $publicKey) {\n            cl_pubkey    \n            gid\n            pid\n            st\n            tid\n            ts\n            uid\n        }\n    }\n": types.GetPostByPublicKeyDocument,
    "\n    query GetPostById($postId: bigint!) {\n        splinglabs_0_1_0_decoded_post(where: {pid: {_eq: $postId}}) {\n            cl_pubkey    \n            gid\n            pid\n            st\n            tid\n            ts\n            uid\n        }\n    }\n": types.GetPostByIdDocument,
    "\n    query GetAllTagsByPublicKey($publicKey: String!) {\n        splinglabs_0_1_0_decoded_tags_by_pk(cl_pubkey: $publicKey) {\n            taglist\n        }\n    }      \n": types.GetAllTagsByPublicKeyDocument,
    "\n    query GetUserByUserId($userId: bigint!) {\n        splinglabs_0_1_0_decoded_userprofile(where: {uid: {_eq: $userId}}) {\n            cl_pubkey    \n            following\n            groups\n            shdw\n            st\n            ts\n            uid\n            username\n        }\n    }      \n": types.GetUserByUserIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetAllGroups($limit: Int, $offset: Int, $orderBy: order_by) {\n        splinglabs_0_1_0_decoded_groupprofile(limit: $limit, offset: $offset, order_by: {ts: $orderBy}) {\n            cl_pubkey\n            gid\n            groupname\n            shdw\n            st\n            ts\n        }\n    }      \n"): (typeof documents)["\n    query GetAllGroups($limit: Int, $offset: Int, $orderBy: order_by) {\n        splinglabs_0_1_0_decoded_groupprofile(limit: $limit, offset: $offset, order_by: {ts: $orderBy}) {\n            cl_pubkey\n            gid\n            groupname\n            shdw\n            st\n            ts\n        }\n    }      \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetGroupByPublicKey($publicKey: String!) {\n        splinglabs_0_1_0_decoded_groupprofile_by_pk(cl_pubkey: $publicKey) {\n            cl_pubkey\n            gid\n            groupname\n            shdw\n            st\n            ts\n        }\n    }\n"): (typeof documents)["\n    query GetGroupByPublicKey($publicKey: String!) {\n        splinglabs_0_1_0_decoded_groupprofile_by_pk(cl_pubkey: $publicKey) {\n            cl_pubkey\n            gid\n            groupname\n            shdw\n            st\n            ts\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetGroupById($groupId: bigint!) {\n        splinglabs_0_1_0_decoded_groupprofile(where: {gid: {_eq: $groupId}}) {\n            cl_pubkey\n            gid\n            groupname\n            shdw\n            st\n            ts\n        }\n    }\n"): (typeof documents)["\n    query GetGroupById($groupId: bigint!) {\n        splinglabs_0_1_0_decoded_groupprofile(where: {gid: {_eq: $groupId}}) {\n            cl_pubkey\n            gid\n            groupname\n            shdw\n            st\n            ts\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetAllLikesByPublicKey($publicKey: String!) {\n        splinglabs_0_1_0_decoded_likes_by_pk(cl_pubkey: $publicKey) {\n            counter\n            users\n        }\n    }      \n"): (typeof documents)["\n    query GetAllLikesByPublicKey($publicKey: String!) {\n        splinglabs_0_1_0_decoded_likes_by_pk(cl_pubkey: $publicKey) {\n            counter\n            users\n        }\n    }      \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetAllPostByGroupId($limit: Int, $offset: Int, $groupId: bigint!, $orderBy: order_by) {\n        splinglabs_0_1_0_decoded_post(limit: $limit, offset: $offset, where: {gid: {_eq: $groupId}}, order_by: {ts: $orderBy}) {\n        cl_pubkey    \n        gid\n        pid\n        st\n        tid\n        ts\n        uid\n        }\n    }      \n"): (typeof documents)["\n    query GetAllPostByGroupId($limit: Int, $offset: Int, $groupId: bigint!, $orderBy: order_by) {\n        splinglabs_0_1_0_decoded_post(limit: $limit, offset: $offset, where: {gid: {_eq: $groupId}}, order_by: {ts: $orderBy}) {\n        cl_pubkey    \n        gid\n        pid\n        st\n        tid\n        ts\n        uid\n        }\n    }      \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetPostByPublicKey($publicKey: String!) {\n        splinglabs_0_1_0_decoded_post_by_pk(cl_pubkey: $publicKey) {\n            cl_pubkey    \n            gid\n            pid\n            st\n            tid\n            ts\n            uid\n        }\n    }\n"): (typeof documents)["\n    query GetPostByPublicKey($publicKey: String!) {\n        splinglabs_0_1_0_decoded_post_by_pk(cl_pubkey: $publicKey) {\n            cl_pubkey    \n            gid\n            pid\n            st\n            tid\n            ts\n            uid\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetPostById($postId: bigint!) {\n        splinglabs_0_1_0_decoded_post(where: {pid: {_eq: $postId}}) {\n            cl_pubkey    \n            gid\n            pid\n            st\n            tid\n            ts\n            uid\n        }\n    }\n"): (typeof documents)["\n    query GetPostById($postId: bigint!) {\n        splinglabs_0_1_0_decoded_post(where: {pid: {_eq: $postId}}) {\n            cl_pubkey    \n            gid\n            pid\n            st\n            tid\n            ts\n            uid\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetAllTagsByPublicKey($publicKey: String!) {\n        splinglabs_0_1_0_decoded_tags_by_pk(cl_pubkey: $publicKey) {\n            taglist\n        }\n    }      \n"): (typeof documents)["\n    query GetAllTagsByPublicKey($publicKey: String!) {\n        splinglabs_0_1_0_decoded_tags_by_pk(cl_pubkey: $publicKey) {\n            taglist\n        }\n    }      \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetUserByUserId($userId: bigint!) {\n        splinglabs_0_1_0_decoded_userprofile(where: {uid: {_eq: $userId}}) {\n            cl_pubkey    \n            following\n            groups\n            shdw\n            st\n            ts\n            uid\n            username\n        }\n    }      \n"): (typeof documents)["\n    query GetUserByUserId($userId: bigint!) {\n        splinglabs_0_1_0_decoded_userprofile(where: {uid: {_eq: $userId}}) {\n            cl_pubkey    \n            following\n            groups\n            shdw\n            st\n            ts\n            uid\n            username\n        }\n    }      \n"];

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function graphql(source: string): unknown;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;