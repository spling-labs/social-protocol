export default class InvalidAvatarType extends Error {
  constructor() {
    super('Avatar file type is invalid. Valid types: ("jpg", "jpeg", "png", "gif")')
    Object.setPrototypeOf(this, InvalidAvatarType.prototype)
  }
}
