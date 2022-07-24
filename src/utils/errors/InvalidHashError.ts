export default class InvalidHashError extends Error {
  constructor() {
    super("Hash is invalid or does not match.");
    Object.setPrototypeOf(this, InvalidHashError.prototype);
  }
}
