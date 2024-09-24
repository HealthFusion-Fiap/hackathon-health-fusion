import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from '@/domain/errors';

export class ErrorPresenter {
  static toPresent(data: Error) {
    let code = 500;
    let message = 'Unexpected Error';

    if (data instanceof BadRequestError) {
      code = 400;
      message = data.message;
    } else if (data instanceof UnauthorizedError) {
      code = 401;
      message = data.message;
    } else if (data instanceof NotFoundError) {
      code = 404;
      message = data.message;
    } else if (data instanceof ConflictError) {
      code = 409;
      message = data.message;
    }

    return {
      code,
      body: { message },
    };
  }
}
