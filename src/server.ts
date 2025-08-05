import Fastify from 'fastify';
import configPlugin from './config/index.js';
import logger from './utils/logger.js'; // Artık 'baseLogger' değil, direkt 'logger'
import { metricsPlugin } from './plugins/metrics.js';
import { healthRoutes } from './routes/health.routes.js';
import { connectorsRoutes } from './routes/connectors.routes.js';

export async function buildServer() {
  const server = Fastify({
    logger: logger, // Kendi logger'ımızı doğrudan veriyoruz
    requestIdHeader: 'x-request-id',
    requestIdLogLabel: 'trace_id',
    // disableRequestLogging: true, // Otomatik loglamayı tekrar açalım, Fastify'ın gücünü kullanalım
  });

  await server.register(configPlugin);
  await server.register(metricsPlugin);
  await server.register(healthRoutes);
  await server.register(connectorsRoutes, { prefix: '/v1' });

  // Manuel 'onResponse' hook'unu kaldırıyoruz, Fastify'ın varsayılan loglaması daha iyi.

  server.setErrorHandler((error, request, reply) => {
    // Sadece hatayı logla, Fastify zaten isteği loglayacak
    server.log.error({ err: error, trace_id: request.id }, error.message);
    const message = server.config.NODE_ENV === 'production' ? 'An unexpected error occurred.' : error.message;
    reply.status(500).send({
      error: { code: 'INTERNAL_SERVER_ERROR', message, trace_id: request.id },
    });
  });

  return server;
}