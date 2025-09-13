import FastifyEnv, { FastifyEnvOptions } from '@fastify/env';
import { Static, Type } from '@sinclair/typebox';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

// Bu, config şemamızın tanımı.
// TypeBox, JSON şemalarını TypeScript tipleriyle birleştirir.
const ConfigSchema = Type.Object({
  NODE_ENV: Type.String({
    default: 'development',
    enum: ['development', 'production', 'test'],
  }),
  HOST: Type.String({ default: '0.0.0.0' }),
  PORT: Type.Number({ default: 17010 }),
  LOG_LEVEL: Type.String({ default: 'info' }),
  GOOGLE_CALENDAR_API_KEY: Type.Optional(Type.String()),
  SALESFORCE_API_KEY: Type.Optional(Type.String()),
});

// Şemadan TypeScript tipini otomatik olarak türet
export type Config = Static<typeof ConfigSchema>;

// Fastify'a, `server.config` özelliğinin var olduğunu ve tipinin `Config` olduğunu bildiriyoruz.
declare module 'fastify' {
  interface FastifyInstance {
    config: Config;
  }
}

// Bu, config'i yükleyen ve sunucuya ekleyen Fastify plugin'idir.
const configPlugin: FastifyPluginAsync = async (server) => {
  const options: FastifyEnvOptions = {
    confKey: 'config', // server.config olarak erişilecek
    schema: ConfigSchema,
    dotenv: true,      // .env dosyasını otomatik yükler
  };
  await server.register(FastifyEnv, options);
};

export default fp(configPlugin);