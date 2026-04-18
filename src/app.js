import express from "express";
import cors from "cors";
import templeRoutes from "./routes/temple.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("TempleConnect API Running 🚀");
});

// ROUTES
app.use("/api/temples", templeRoutes);
app.use("/api/auth", authRoutes);

export default app;