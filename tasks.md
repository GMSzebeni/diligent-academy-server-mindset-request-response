# Tasks

## Task 1: Get to know your repo

Answer the following questions:

- A good start to understand the repo is to check the `package.json`. What is the HTTP server library used here? What development tools are configured? 
- What does the following scripts do? `dev`, `test`
- What is the entry point of the server?
- What do you think why is the `app.ts` and the `server.ts` is separated? 
- If you would create a new endpoint in which file would you put it?
- In the tests which method simulates the HTTP request?
- What do you think what does the `ts-node` package do?

## Task 2: Meet with Fastify

Fastify is an HTTP server just like Express JS, Nest JS or Hapi JS.

The goal of Fastify as its name suggests to be fast and modular.

It is pretty similar to Express, but uses a little bit different methods and properties on its Request and Reply (Response in Express) objects.

- Implement a new endpoint: `GET /api/good-bye`.
- It should respond with the following JSON string `{"message": "Good Bye Visitor!"}` and `200 OK` status.
- To run tests for this task: `npm test -- task2`

### Background materials

- [Fastify Home](https://fastify.dev/)
- [Fastify Docs](https://fastify.dev/docs/latest/)

## Task 3: 