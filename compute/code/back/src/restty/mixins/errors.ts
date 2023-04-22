export enum UserErrorTypes {
  MissingData = "MissingData",
}

export class UserError extends Error {
  constructor(message: string, public type: UserErrorTypes) {
    super(message);

    this.name = type;
  }
}
