export default class PostNotFoundError extends Error {
  constructor() {
    super('Post not found.')
    Object.setPrototypeOf(this, PostNotFoundError.prototype)
  }
}
