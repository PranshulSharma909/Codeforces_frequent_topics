import express from "express";
import dataRouter from "./routes/tags.js";
import cors from "cors"; 

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/tags", dataRouter);

// Health check
app.get("/", (req, res) => {
  res.send("CF Tag Explorer API is running!");
});

export default app;
