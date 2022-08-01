import { web3 } from '@project-serum/anchor'

export type UserFileData = {
  username: string
  avatar: string
  bio: string
}

export type User = {
  publicKey: web3.PublicKey
  shdw: web3.PublicKey
  hash: web3.PublicKey
  username: string
  avatar: string
  bio: string
}

export type SplingFileData = {
  name: string
  bio: string
  image: string
}

export type Spling = {
  publicKey: web3.PublicKey
  user: web3.PublicKey
  shdw: web3.PublicKey
  hash: web3.PublicKey
  name: string
  bio: string
  image: string
}

export type Post = {
  text: string
  image: string
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
