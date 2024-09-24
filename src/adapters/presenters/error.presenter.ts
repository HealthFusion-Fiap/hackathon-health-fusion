import { BadRequestError, ConflictError, NotFoundError } from '@/domain/errors';

type ErrorMapping = [new (...args: any[]) => Error, number];

export class ErrorPresenter {
  private static errorMap: ErrorMapping[] = [
    [NotFoundError, 404],
    [BadRequestError, 400],
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
