export default class SplingNotFoundError extends Error {
  constructor() {
    super('Spling not found.')
    Object.setPrototypeOf(this, SplingNotFoundError.prototype)
  }
}
