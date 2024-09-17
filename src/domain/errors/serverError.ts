import { AppError } from './app';

export class ServerError extends AppError {
  constructor() {
    super();
    this.code = 150000;
    this.message = 'Internal Server Error';
  }
}
