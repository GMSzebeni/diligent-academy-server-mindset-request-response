import fastify from 'fastify';

export default function createApp(options = {}) {
  const app = fastify(options)

  app.get('/api/hello', (request, reply) => {
    reply.send({hello: "World!"})
  })

  app.get('/api/good-bye', (request, reply) => {
    reply.code(200).send({ message: "Good Bye Visitor!" });
  })

  const schema = {
    params: {
      type: "object",
      properties: {
        beverage: { enum: ["coffee", "tea", "chai"] }
      },
      required: ["beverage"],
      additionalProperties: false
    },
    body: {
      content: {
        'application/json': {
          schema: {
            type: "object"
          }
        }
      },
      required: ["kind"]
    },
    queryString: {
      type: "object",
      properties: {
        milk: {
          type: "string"
        },
        sugar: {
          type: "string"
        }
      }
    }
  }

  type PostBeverageRouteType = {
    Querystring: { milk?: "yes" | "no", sugar?: "yes" | "no" };
    Params: { beverage: "coffee" | "tea" | "chai" };
    Body: { kind: "string" };
    Headers: { 'CodeCool-Beverages-Dietary'?: 'lactose-intolerance' | 'vegan' };
  }

  app.post<PostBeverageRouteType>(
    '/api/beverages/:beverage',
    {
      schema: schema
    },
    (request, reply) => {
      const { beverage } = request.params;
      const { milk, sugar } = request.query;
      const { kind } = request.body;
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

      const replyMessage = { drink: kind + " " + beverage, with: condiments }
      
      if (beverage === "coffee") {
        reply.code(418).send(replyMessage);
      } else {
        reply.code(201).send(replyMessage);
      }
    }
  )

  return app;
}