import Fastify from "fastify";
import { clerkPlugin } from "@clerk/fastify";
import { shouldBeUser } from "./middleware/authMiddleware.js";
import { connectOrderDB } from "../../../packages/order-db/src/connection.js";
import { orderRouts } from "./routes/order.js";

const fastify = Fastify();

fastify.register(clerkPlugin);

fastify.get("/test", { preHandler: shouldBeUser }, (request, reply) => {
  reply.send({
    message: "order-service autenteficated",
    userId: request.userId,
  });
});

fastify.get("/health", (request, reply) => {
  return reply.status(200).send({
    status: "ok",
    uptime: process.uptime(),
    timeStamp: Date.now(),
  });
});

fastify.register(orderRouts);

const start = async () => {
  try {
    await connectOrderDB();
    await fastify.listen({ port: 8001 });
    console.log("Order service is running on port 8001");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
