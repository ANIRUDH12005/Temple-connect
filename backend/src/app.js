import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import templeRoutes from "./routes/temple.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors());

// Logging Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("TempleConnect API Running 🚀");
});

// ROUTES
app.use("/api/temples", templeRoutes);
app.use("/api/auth", authRoutes);

// Error Handler
app.use(errorHandler);

export default app;