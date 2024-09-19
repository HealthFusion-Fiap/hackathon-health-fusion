import 'source-map-support/register';
import { setupContainer } from '@/infra/bootstrap';
import { getConfig } from '@/infra/config/config';
import { shutdownHttpServer, startHttpServer } from "@/infra/http/httpServer";

async function init() {
  try {
    const config = await getConfig();
    const container = setupContainer(config);

    startHttpServer(config, container);

    console.log('Done!');
  } catch (error) {
    console.error('Error initializing application', error);

    shutdown(1);
  }
}

async function shutdown(exitCode: number) {
  console.log('Stopping application...');

  try {
    await shutdownHttpServer();
    console.log('HTTP server stopped');
  } catch (error) {
    console.error('Error stopping HTTP server', error);
  }

  process.exit(exitCode);
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));
init();
