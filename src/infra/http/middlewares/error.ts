import { NextFunction, Request, Response } from 'express';
import { AppRequest, HttpError } from '../httpServer';
import { AppError, BadRequestError, NotFoundError } from '@/domain/errors';
import { ServerError } from '@/domain/errors/serverError';

export type ErrorTypes = (
  BadRequestError |
  NotFoundError |
  ServerError |
  AppError |
  Error
)

export function formatAppError(error: AppError) {
  return {
    code: error.code,
    name: error.constructor.name,
    message: error.message,
  };
}

export function handleError(error: ErrorTypes, response: Response) {
  let statusCode = 500;

  if (error instanceof BadRequestError) statusCode = 400;
  else if (error instanceof NotFoundError) statusCode = 404;

  if (error instanceof AppError) {
    return response.status(statusCode).json(formatAppError(error));
  }

  return response
    .status(statusCode).json(formatAppError(new ServerError()));
}

export default (
  error: HttpError,
  request: Request | AppRequest,
  response: Response,
  next: NextFunction,
) => {
  console.error('An error occurred', error);

  handleError(error, response);

  next();
};
