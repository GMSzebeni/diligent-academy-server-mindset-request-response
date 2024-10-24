import fastify from 'fastify';

export default function createApp(options = {}) {
  const app = fastify(options)

  app.get('/api/hello', (request, reply) => {
    reply.send({hello: "World!"})
  })

  app.get('/api/good-bye', (request, reply) => {
    reply.code(200).send({ message: "Good Bye Visitor!" });
  })

  type PostBeverageRouteType = {
    Querystring: { milk?: "yes" | "no", sugar?: "yes" | "no" }
    Params: { beverage: "coffee" | "tea" | "chai" };
  }

  app.post<PostBeverageRouteType>('/api/beverages/:beverage', (request, reply) => {
    const { beverage } = request.params;
    const { milk, sugar } = request.query;

    const condiments = [];
    if(milk === "yes") condiments.push("milk");
    if (sugar === "yes") condiments.push("sugar");

    reply.code(200).send({ drink: beverage, with: condiments });
  })

  return app;
}