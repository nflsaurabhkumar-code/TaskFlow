import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import organizationRoutes from "./routes/organizationRoutes.js";
import { notFoundMiddleware, errorMiddleware } from "./middleware/errorMiddleware.js";

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/api/health", (_req, res) => {
  res.status(200).json({ success: true, message: "TaskFlow API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/organizations", organizationRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
