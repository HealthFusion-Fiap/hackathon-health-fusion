import {
  asClass,
  asValue,
  AwilixContainer,
  createContainer,
  InjectionMode,
  Lifetime,
} from 'awilix';
import path from 'path';
import { Config } from '@/infra/config/config';

export function setupContainer(config: Config): AwilixContainer {
  const container = createContainer({ injectionMode: InjectionMode.PROXY });
  const env = process.env.NODE_ENV || 'development';

  container.register({
    env: asValue(env),
    config: asValue(config),
  });

  const baseDir = path.resolve(__dirname, '..');

  container.loadModules([
    [
      `${baseDir}/adapters/**/*.js`, {
        lifetime: Lifetime.SCOPED,
      },
    ],
    [
      `${baseDir}/domain/usecases/**/*[.]usecase.js`, {
        lifetime: Lifetime.SCOPED,
      },
    ],
    [
      `${baseDir}/infra/repositories/**/*.js`, {
        lifetime: Lifetime.SINGLETON,
      },
    ],
    [
      `${baseDir}/infra/repositories/**/*.js`, {
        lifetime: Lifetime.SINGLETON,
      },
    ],
  ], {
      formatName: 'camelCase',
      resolverOptions: {
        lifetime: Lifetime.SINGLETON,
        register: asClass,
      },
  });
  
  return container;
}
