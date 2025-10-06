import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors"; 
import router from "./routes/index.js";
import { config } from "./config/index.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5030"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(express.json());

connectDB();

app.get("/my_health", async (req, res) => {
  return res.json({
    success: true,
    msg: `Server working fine!`,
  });
});

app.use("/api", router);
const PORT = config.port || 8001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
