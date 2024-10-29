import fastify from 'fastify';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';

export default function createApp(options = {}) {
  const app = fastify(options).withTypeProvider<JsonSchemaToTsProvider>();

  app.get('/api/hello', (request, reply) => {
    reply.send({hello: "World!"})
  })

  app.get('/api/good-bye', (request, reply) => {
    reply.code(200).send({ message: "Good Bye Visitor!" });
  })

  const paramsSchema = {
    type: "object",
    properties: {
      beverage: { enum: ["coffee", "tea", "chai"] }
    },
    required: ["beverage"],
    additionalProperties: false
  } as const;

  const bodySchema = {
    type: "object",
    properties: {
      kind: {
        type: "string"
      }
    },
    required: [],
    additionalProperties: false  
  } as const;

  const queryStringSchema = {
    type: "object",
    properties: {
      milk: {
        type: "string",
        enum: ["yes", "no"]
      },
      sugar: {
        type: "string",
        enum: ["yes", "no"]
      }
    },
    additionalProperties: false
  } as const;

  const responseSchema = {
    201: {
      description: "Your drink is ready",
      content: {
        "application/json": {
          schema: {
            drink: {
              type: "string"
            },
            with: {
              type: "array",
              items: {
                type: "string"
              }
            }
          }
        }
      }
    }
  } as const;

  /* type PostBeverageRouteType = {
    Querystring: { milk?: "yes" | "no", sugar?: "yes" | "no" };
    Params: { beverage: "coffee" | "tea" | "chai" };
    Body: { kind?: "string" };
    Headers: { 'CodeCool-Beverages-Dietary'?: 'lactose-intolerance' | 'vegan' };
  }; */

  app.post(
    '/api/beverages/:beverage', { 
      schema: {
        params: paramsSchema,
        body: bodySchema,
        querystring: queryStringSchema,
        response: responseSchema
    }}, 
    (request, reply) => {
      const { beverage } = request.params;
      const { milk, sugar } = request.query;
      const { kind }  = request.body;
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