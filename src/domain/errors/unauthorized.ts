export class UnauthorizedError extends Error {
  constructor(public message: string) {
    super(message || 'Unauthorized');
  }
}

export class InvalidPassword extends UnauthorizedError {
  constructor() {
    super('Invalid password');
  }
}
