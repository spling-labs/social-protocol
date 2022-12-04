export default class PayerNotFoundError extends Error {
  constructor() {
    super('Payer was not specified while initializing the social protocol.')
    Object.setPrototypeOf(this, PayerNotFoundError.prototype)
  }
}
