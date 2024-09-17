import { AppError } from './app';

export class NotFoundError extends AppError {
  constructor() {
    super();
    this.code = 140400;
    this.message = 'Not Found';
  }
}
