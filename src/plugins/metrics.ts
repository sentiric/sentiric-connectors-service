import { FastifyInstance, FastifyPluginAsync, FastifyReply } from 'fastify';
import fp from 'fastify-plugin';
import client from 'prom-client';

// TypeScript'e FastifyReply arayüzünü genişlettiğimizi bildiriyoruz.
// Bu, 'startTime' özelliğini güvenle kullanmamızı sağlar.
declare module 'fastify' {
  interface FastifyReply {
    startTime?: number;
  }
}

export const metricsPlugin: FastifyPluginAsync = fp(async (server: FastifyInstance) => {
  const register = new client.Registry();
  client.collectDefaultMetrics({ register });

  const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [50, 100, 250, 500, 1000, 2500, 5000],
  });
  register.registerMetric(httpRequestDurationMicroseconds);

  server.addHook('onRequest', (request, reply, done) => {
    reply.startTime = Date.now();
    done();
  });

  server.addHook('onResponse', (request, reply, done) => {
    // DÜZELTME: startTime'ın var olup olmadığını kontrol et
    if (reply.startTime) {
      const responseTime = Date.now() - reply.startTime;
      // DÜZELTME: routeOptions.url'in undefined olabileceği durumu ele al
      const route = request.routeOptions.url || request.url;
      httpRequestDurationMicroseconds
        .labels(request.method, route, String(reply.statusCode))
        .observe(responseTime);
    }
    done();
  });

  server.get('/metrics', async (request, reply) => {
    reply.header('Content-Type', register.contentType);
    return register.metrics();
  });
});