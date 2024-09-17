import { AppError } from './app';

export class BadRequestError extends AppError {
  constructor() {
    super();
    this.code = 140000;
    this.message = 'Bad Request';
  }
}

export class ValidationError extends BadRequestError {
  constructor(message?: string) {
    super();
    this.code = 140001;
    this.message = message || 'Params Validation Failure';
  }
}