import { web3 } from '@project-serum/anchor'

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

export type UserFileDataV2 = {
  userId: number
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

export type GroupFileDataV2 = {
  groupId: number
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
  title: string | null
  text: string | null
  media: MediaData[]
  license: string | null
  metadata: any | null
}

export type PostFileDataV2 = {
  postId: number
  timestamp: string
  programId: string
  userId: string
  groupId: string
  title: string | null
  text: string | null
  media: MediaData[]
  license: string | null
  metadata: any | null
}

export type PostTextFileData = {
  postId: number
  text: string | null
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
  title: string | null
  text: string
  media: MediaData[]
  license: string | null
  user: PostUser
  likes: number[]
  tags: string[]
  metadata: any | null
}

export type ReplyFileData = {
  timestamp: string
  userId: string
  postId: string
  text: string
}

export type ReplyFileDataV2 = {
  publicKey: string
  timestamp: string
  userId: string
  postId: string
  text: string
}

export type ReplyTextFileData = {
  publicKey: string
  text: string | null
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

export interface ProtocolOptions {
  rpcUrl: string | null
  useIndexer: boolean
}
