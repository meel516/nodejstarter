import express from "express";
import v1Routes from "./routes/v1/index.js";
import connectDB from "./config/db.js";
import { rabbitMQService } from "./utils/RabbiMQ.js"; // <- make sure this is imported!
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/v1", v1Routes);

const startServer = async () => {
  try {
    await connectDB(); // ⬅️ Ensure connectDB is async
    await rabbitMQService.connect(); // ⬅️ Connect to RabbitMQ

    app.listen(3000, () => {
      console.log("🚀 Server is running on port 3000");
    });
  } catch (err) {
    console.error("❌ Server failed to start:", err);
    process.exit(1);
  }
};

startServer();
