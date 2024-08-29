export class ExistingUserError extends Error {
  constructor() {
    super('User already exists');
  }
}

export class UserNotFoundError extends Error {
  constructor() {
    super('User not found');
  }
}
