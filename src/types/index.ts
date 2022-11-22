import { web3 } from 'react-native-project-serum-anchor'

export type MediaData = {
  file: string
  type: string
}

export type SocialData = {
  name: string
  handle: string
}

export type UserFileData = {
  timestamp: string
  nickname: string
  bio: string
  avatar: MediaData | null
  banner: MediaData | null
  socials: SocialData[]
  license: string | null
}

export type User = {
  timestamp: number
  publicKey: web3.PublicKey
  userId: number
  status: number
  shdw: web3.PublicKey
  following: number[]
  groups: number[]
  nickname: string
  bio: string
  avatar: string | null
  banner: string | null
  socials: SocialData[]
  license: string | null
}

export type GroupFileData = {
  timestamp: string
  name: string
  bio: string
  avatar: MediaData | null
  banner: MediaData | null
  license: string | null
}

export type Group = {
  timestamp: number
  publicKey: web3.PublicKey
  groupId: number
  status: number
  shdw: web3.PublicKey
  name: string
  bio: string
  avatar: string | null
  banner: string | null
  license: string | null
}

export type PostFileData = {
  timestamp: string
  programId: string
  userId: string
  groupId: string
  text: string | null
  media: MediaData[]
  license: string | null
  encryptedSymmetricKey: string
  accessControlConditions: [LitSolRpcCondition]
}

export type PostUser = {
  publicKey: web3.PublicKey
  nickname: string
  avatar: string | null
}

export type Post = {
  publicKey: web3.PublicKey
  timestamp: number
  status: number
  programId: string
  userId: number
  postId: number
  groupId: number
  text: string
  media: MediaData[]
  license: string | null
  user: PostUser
  likes: number[]
}

export type ReplyFileData = {
  timestamp: string
  userId: string
  postId: string
  text: string
}

export type Reply = {
  publicKey: web3.PublicKey
  timestamp: number
  status: number
  userId: number
  postId: number
  text: string
  user: PostUser
}

export interface FileData {
  type: string
  base64: string
  size: number
}

export interface FileUriData {
  uri: string
  type: string
  size: number
}

export interface LitClientConfiguration {
  alertWhenUnauthorized: false
  minNodeCount: number
  debug: boolean
}

export interface LitAuthSig {
  sig: string
  derivedVia: string
  signedMessage: string
  address: string
}

export interface LitSolRpcCondition {
  method: string,
  params: [string]
  pdaParams: []
  pdaInterface: LitSolRpcConditionPdaInterface
  pdaKey: string
  chain: string
  returnValueTest: LitSolRpcConditionReturnValueTest
}

export interface LitSolRpcConditionPdaInterface {
  offset: number
  fields: {}
}

export interface LitSolRpcConditionReturnValueTest {
  key: string
  comparator: string
  value: string
}

export interface LitNodeSaveEncryptionParams {
  accessControlConditions: [LitSolRpcCondition]
  symmetricKey: Uint8Array
  authSig: LitAuthSig
  chain: string
}

export interface LitNodeDecryptionParams {
  accessControlConditions: [LitSolRpcCondition]
  toDecrypt: Uint8Array
  chain: string
  authSig: LitAuthSig
}