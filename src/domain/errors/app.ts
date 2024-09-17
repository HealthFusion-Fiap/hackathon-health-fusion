export class AppError extends Error implements IAppError {
  public code: number;

  public message: string;

  constructor() {
    super();
    this.code = 1;
    this.message = 'Application Error';
  }
}

interface IAppError {
  code: number
  message: string
}