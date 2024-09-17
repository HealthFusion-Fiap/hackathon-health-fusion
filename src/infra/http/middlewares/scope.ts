import { AwilixContainer, asValue } from 'awilix';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';
import { AppRequest } from '../http-server';

export default (container: AwilixContainer) => (
  request: Request | AppRequest,
  response: Response,
  next: NextFunction,
) => {
  const scope = container.createScope();

  scope.register({
    requestId: asValue(randomUUID()),
  });

  if (response) {
    scope.register({
      responseHandler: asValue(response),
    });
  }

  (request as AppRequest).container = scope;

  next();
};
