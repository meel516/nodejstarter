import amqp from "amqplib";
import { createLogger } from "./logger.js";
import dotenv from "dotenv";

dotenv.config();
const logger = createLogger("rabbitmq");

class RabbitMQService {
  connection = null;
  channel = null;
  url = null;

  constructor() {
    this.url = process.env.RABBITMQ_URL || "amqp://localhost:5672";
  }

  async connect() {
    try {
      this.connection = await amqp.connect(this.url);
      this.channel = await this.connection.createChannel();

      logger.info("Connected to RabbitMQ");

      this.connection.on("error", (err) => {
        logger.error("RabbitMQ connection error", err);
      });

      this.connection.on("close", () => {
        logger.warn("RabbitMQ connection closed");
      });

      // Setup exchanges and queues
      await this.setupExchangesAndQueues();
    } catch (error) {
      logger.error("Failed to connect to RabbitMQ", error);
      throw error;
    }
  }

  async setupExchangesAndQueues() {
    if (!this.channel) return;

    // Create exchanges

    await this.channel.assertExchange("user.events", "topic", {
      durable: true,
    });

    // Create queues

    await this.channel.assertQueue("notifications.user", { durable: true });

    await this.channel.bindQueue("notifications.user", "user.events", "user.*");
  }

  async publishEvent(exchange, routingKey, event) {
    if (!this.channel) {
      throw new Error("RabbitMQ channel not initialized");
    }

    const message = Buffer.from(JSON.stringify(event));

    const published = this.channel.publish(exchange, routingKey, message, {
      persistent: true,
      timestamp: Date.now(),
    });

    if (published) {
      logger.info("Event published", {
        exchange,
        routingKey,
        eventType: event.type,
      });
    } else {
      logger.error("Failed to publish event", {
        exchange,
        routingKey,
        eventType: event.type,
      });
    }
  }

  async subscribe(queue, callback) {
    if (!this.channel) {
      throw new Error("RabbitMQ channel not initialized");
    }

    await this.channel.consume(queue, async (message) => {
      if (!message) return;

      try {
        const event = JSON.parse(message.content.toString());
        await callback(event);
        this.channel.ack(message);

        logger.info("Message processed successfully", {
          queue,
          eventType: event.type,
        });
      } catch (error) {
        logger.error("Error processing message", { queue, error });
        this.channel.nack(message, false, false); // Don't requeue
      }
    });

    logger.info("Subscribed to queue", { queue });
  }

  async disconnect() {
    try {
      if (this.channel) {
        await this.channel.close();
      }
      if (this.connection) {
        await this.connection.close();
      }
      logger.info("Disconnected from RabbitMQ");
    } catch (error) {
      logger.error("Error disconnecting from RabbitMQ", error);
    }
  }
}

export const rabbitMQService = new RabbitMQService();
