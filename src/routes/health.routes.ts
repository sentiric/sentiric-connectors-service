import { FastifyInstance, FastifyPluginAsync } from 'fastify';

export const healthRoutes: FastifyPluginAsync = async (server: FastifyInstance) => {
  server.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });
};