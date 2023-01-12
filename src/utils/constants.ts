import { web3 } from '@project-serum/anchor'

export const isBrowser = typeof document !== 'undefined'
export const programId = new web3.PublicKey('D2mvyNuzAKFAsfmwgZpt6hCL45LJQw1Y965z6dnV15hZ')
export const shadowDriveDomain = 'https://shdw-drive.genesysgo.net/'
export const INDEXER_GRAPH_QL_ENDPOINT = 'https://knowing-dodo-22.hasura.app/v1/graphql'
export const SHDW_TOKEN_ADDRESS = new web3.PublicKey('SHDWyBxihqiCj6YekG2GUr7wqKLeLAMK1gHZck9pL6y')
export const SPLING_TOKEN_ADDRESS = new web3.PublicKey('7ntd5CooEfEcfu4KEZkEnBgsKN5ZvTUUCM7UMZtmKzHj')
export const SPLING_TOKEN_ACCOUNT_RECEIVER = new web3.PublicKey('2pUqRSzLze85PQYGzPGuxREMyi1rs9cbmEA3dm1Jtawb')
