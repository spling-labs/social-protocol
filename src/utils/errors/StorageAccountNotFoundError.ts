export default class StorageAccountNotFoundError extends Error {
  constructor() {
    super('Storage account not found.')
    Object.setPrototypeOf(this, StorageAccountNotFoundError.prototype)
  }
}
