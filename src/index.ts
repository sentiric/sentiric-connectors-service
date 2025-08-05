import { buildServer } from './server.js';
import { registerConnectors } from './connectors/index.js';

function setupGracefulShutdown(server: Awaited<ReturnType<typeof buildServer>>) {
  const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];
  for (const signal of signals) {
    process.on(signal, () => {
      server.log.info({ signal }, 'Shutdown signal received, shutting down gracefully...');
      server.close().then(() => {
        // Loglama server kapandıktan sonra çalışmayabilir, o yüzden önce logla.
        process.exit(0);
      }).catch((err) => {
        server.log.error(err, 'Error during server shutdown.');
        process.exit(1);
      });
    });
  }
}

async function start() {
  const server = await buildServer();
  
  try {
    registerConnectors();
    server.log.info('Connectors registered');

    await server.listen({ port: server.config.PORT, host: server.config.HOST });
    
    // Server.listen logu zaten Fastify tarafından atılacak, bizim tekrar atmamıza gerek yok.
    
    setupGracefulShutdown(server);

  } catch (err) {
    server.log.error(err, 'Error starting server');
    process.exit(1);
  }
}

start();