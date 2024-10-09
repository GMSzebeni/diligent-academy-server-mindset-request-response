import fastify from 'fastify';

export default function createApp(options = {}) {
  const app = fastify(options)

  app.get('/api/hello', () => {
    return { hello: 'World!' }
  })

  return app;
}