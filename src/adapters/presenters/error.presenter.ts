import { BadRequestError, NotFoundError } from '@/domain/errors';

export class ErrorPresenter {
  static toPresent(data: Error) {
    let code = 500;
    let message = 'Unexpected Error';

    if (data instanceof NotFoundError) {
      code = 404;
      message = data.message;
    }

    if (data instanceof BadRequestError) {
      code = 404;
      message = data.message;
    }

    return {
      code,
      body: { message },
    };
  }
}
