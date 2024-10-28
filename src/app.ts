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
    Querystring: { milk?: "yes" | "no", sugar?: "yes" | "no" };
    Params: { beverage: "coffee" | "tea" | "chai" };
    Body: { kind?: "string" }
    Headers: { 'CodeCool-Beverages-Dietary'?: 'lactose-intolerance' | 'vegan' }
  }

  app.post<PostBeverageRouteType>('/api/beverages/:beverage', (request, reply) => {
    const { beverage } = request.params;
    if (!beverage || beverage !== "coffee" && beverage !== "tea" && beverage !== "chai") {
      reply.code(400).send({reason: 'bad drink'});
    }
    const { milk, sugar } = request.query;
    //const { kind } = request.body;
    const diet = request.headers['codecool-beverages-dietary'];

    const condiments = [];
    if(milk === "yes") {
      if (diet === "lactose-intolerance") {
        condiments.push("lf-milk");
      } else if (diet === "vegan") {
        condiments.push("oat-milk");
      } else {
        condiments.push("milk");
      }
    }
    if (sugar === "yes") condiments.push("sugar");

    const replyMessage = { drink: /*kind + " " + */beverage, with: condiments }
    
    if (beverage === "coffee") {
      reply.code(418).send(replyMessage);
    } else {
      reply.code(201).send(replyMessage);
    }
  })

  return app;
}