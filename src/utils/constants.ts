import { web3 } from 'react-native-project-serum-anchor'

export const isBrowser =
  typeof document !== 'undefined' && !Object.prototype.hasOwnProperty.call(window.process, 'type')

export const programId = new web3.PublicKey('2CfHWikwHGSAb4mudPdnWEbf5CQwXbod1d9bN9pL34gs')

export const shadowDriveDomain = 'https://shdw-drive.genesysgo.net/'
