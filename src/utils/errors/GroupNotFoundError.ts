export default class GroupNotFoundError extends Error {
  constructor() {
    super('Group not found.')
    Object.setPrototypeOf(this, GroupNotFoundError.prototype)
  }
}
