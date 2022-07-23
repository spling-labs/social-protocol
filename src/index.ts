import { createUser, updateUser } from "./methods";

import { User } from "./types";

export class SplingProtocol {
  createUser = () => createUser;
  updateUser = (user: User) => updateUser;

  constructor() {}

  public async init(): Promise<SplingProtocol> {
    return this;
  }
}

export { User };
