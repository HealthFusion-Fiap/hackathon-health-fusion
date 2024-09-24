import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from '@/domain/errors';

type ErrorMapping = [new (...args: any[]) => Error, number];

export class ErrorPresenter {
  private static errorMap: ErrorMapping[] = [
    [BadRequestError, 400],
    [UnauthorizedError, 401],
    [NotFoundError, 404],
    [ConflictError, 409],
  ];

  static toPresent(error: Error) {
    const foundError = this.errorMap.find(([ErrorClass]) => error instanceof ErrorClass);
    const code = foundError ? foundError[1] : 500;
    const message = error.message || 'Unexpected Error';

    return {
      code,
      body: { message },
    };
  }
}
