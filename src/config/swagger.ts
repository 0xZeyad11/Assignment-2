import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "Tasks API",
      version: "1.0.0",
      description: "CRUD API for managing Tasks"
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ["./src/routes/*.ts"]
}

export const swaggerSpecs = swaggerJsdoc(options);
