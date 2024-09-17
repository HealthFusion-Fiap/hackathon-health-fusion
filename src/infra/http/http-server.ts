import http from 'http';
import httpShutdown from 'http-shutdown';
import express from 'express';
import { AwilixContainer } from 'awilix';
import cors from 'cors';
import { Config } from '@/infra/config/config';
import routes from './routes';
import { AppError } from '@/domain/errors';
import scopeMiddleware from './middlewares/scope';
import errorMiddleware from './middlewares/error';

export type AppRequest = {
  id: string
  container: AwilixContainer
}

export type AppResponse = {}

export class HttpError extends AppError {
  public status?: number;
}

let server: http.Server | null = null;

export const startHttpServer = (
  config: Config,
  container: AwilixContainer,
): http.Server => {
  if (server) {
    throw new Error('HTTP Server already started');
  }

  const app = express();

  app.disable('x-powered-by');
  app.enable('trust proxy');
  app.use(scopeMiddleware(container));
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json());
  routes(app);
  app.use(errorMiddleware);

  server = httpShutdown(http.createServer(app));

  server.listen(config.port, () => {
    console.log(`HTTP server listening on port ${config.port}`);
  });

  return server;
};

export const shutdownHttpServer = async (): Promise<void> => {
  if (!server) {
    throw new Error('HTTP Server not started');
  }

  const serverTmp = server;

  return new Promise((resolve, reject) => {
    (serverTmp as any).shutdown((error: Error) => {
      server = null;
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};
