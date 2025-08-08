import { FastifyInstance, FastifyPluginAsync } from 'fastify'; // EKSİK IMPORT EKLENDİ
import { Static, Type } from '@sinclair/typebox';
import { getConnector } from '../core/connector.registry.js';

const executeBodySchema = Type.Object({
  connector: Type.String(),
  action: Type.String(),
  params: Type.Optional(Type.Record(Type.String(), Type.Any())),
});

type ExecuteBody = Static<typeof executeBodySchema>;

export const connectorsRoutes: FastifyPluginAsync = async (server: FastifyInstance) => {
  server.post<{ Body: ExecuteBody }>(
    '/execute',
    { schema: { body: executeBodySchema } },
    async (request, reply) => {
      const { connector, action, params } = request.body; // DEĞİŞKENLERİN TANIMI BURADA
      const connectorInstance = getConnector(connector);

      if (!connectorInstance) {
        return reply.status(404).send({
          error: {
            code: 'CONNECTOR_NOT_FOUND',
            message: `Connector '${connector}' is not registered.`,
          },
        });
      }

      try {
        const result = await connectorInstance.execute(action, params);
        return { data: result };
      } catch (error: any) {
        server.log.error(error, `Execution failed for ${connector}.${action}`);
        
        const errorCode = error && typeof error === 'object' && 'code' in error ? error.code : 'EXECUTION_FAILED';
        return reply.status(400).send({
          error: {
            code: errorCode,
            message: error.message,
          },
        });
      }
    }
  );
};