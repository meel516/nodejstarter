import express from "express";
import v1Routes from "./routes/v1/index.js";
import connectDB from "./config/db.js";
import cors from "cors"
const app = express();
app.use(express.json());
app.use(cors())
connectDB();
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/v1", v1Routes);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
