import {
  Application,
  NextFunction,
  Request,
  Response,
} from 'express';
import { AppRequest } from './httpServer';
import { ErrorTypes, handleError } from './middlewares/error';

function executeController(controllerName: string) {
  return async (
    request: Request | AppRequest,
    response: Response,
    next: NextFunction,
  ) => {
    const { container } = request as AppRequest;

    try {
      const controller = container.resolve(`${controllerName}Controller`);

      return await controller.executeEndpoint(request, response, next);
    } catch (error: any) {
      console.error(error.message, error);

      return handleError(error as ErrorTypes, response);
    }
  };
}

export default (app: Application) => {
  app.route('/healthcheck')
    .get((_, response) => response.status(200).end());

  app.route('/').get((_, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hello World!\n');
  });

  app.route('/doctors').post(
    // validator('createDoctor'),
    executeController('createDoctor'),
  );
};
