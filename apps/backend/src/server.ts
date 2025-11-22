import express, { type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CLIENT_URL || true, credentials: true }));
app.use(express.json());

app.get("/api/health", (_: Request, res: Response) => {
  res.json({ status: "ok", service: "nutrisync-backend" });
});

app.listen(PORT, () => {
  console.log(`NutriSync backend running on port ${PORT}`);
});
