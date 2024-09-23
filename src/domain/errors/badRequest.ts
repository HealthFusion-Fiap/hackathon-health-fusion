export class BadRequestError extends Error {
  constructor(public message: string) {
    super(message);
  }
}

export class ValidationError extends Error {
  constructor(public message: string) {
    super(message);
  }
}
