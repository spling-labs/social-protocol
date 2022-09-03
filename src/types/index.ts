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
}

export type Post = {
  timestamp: number
  publicKey: web3.PublicKey
  status: number
  programId: string
  userId: number
  groupId: number
  text: string
  media: MediaData[]
  license: string | null
  userNickname: string
  userAvatar: string | null
}

export type Reply = {
  text: string
}

export interface FileData {
  name: string
  type: string
  size: string
  base64: string
}
