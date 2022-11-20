export default class ReplyNotFoundError extends Error {
  constructor() {
    super('Reply not found.')
    Object.setPrototypeOf(this, ReplyNotFoundError.prototype)
  }
}
