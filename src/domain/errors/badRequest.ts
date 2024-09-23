export class BadRequestError extends Error {
  constructor(public message: string) {
    super(message || 'Bad Request');
  }
}

export class ValidationError extends Error {
  constructor(public message: string) {
    super(message || 'Validation Error');
  }
}
