
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Stock Reservation Service API",
      version: "1.0.0",
      description:
        "REST API for inventory management, orders, stock reservations, user authentication, and notifications.",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis:["./src/docs/*.js"],
};

export default swaggerJsdoc(options);
