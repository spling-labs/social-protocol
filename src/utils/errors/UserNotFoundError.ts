export default class UserNotFoundError extends Error {
  constructor() {
    super("User not found.");
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}
