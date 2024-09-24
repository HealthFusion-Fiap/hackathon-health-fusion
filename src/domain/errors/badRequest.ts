export class BadRequestError extends Error {
  constructor(public message: string) {
    super(message || 'Bad Request');
  }
}

export class ValidationError extends BadRequestError {
  constructor(public message: string) {
    super(message || 'Validation Error');
  }
}
