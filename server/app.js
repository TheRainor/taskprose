import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/api/auth-routes.js";
import taskRoutes from "./routes/api/task-routes.js";
import listRoutes from "./routes/api/list-routes.js";
import { errorHandler } from "./middleware/error-handler.js";
import { blacklistCleanupJob } from "./jobs/blacklist-cleanup-job.js";

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// CORS
const allowedOrigins = process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(",") : ["http://localhost:5173"];

allowedOrigins.push("file://");

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || origin === "null" || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log(`❌ CORS was rejected: ${origin}`);
        callback(new Error("Your CORS policy does not allow this origin."));
      }
    },
    credentials: true,
  }),
);

// API Routes
app.use("/", authRoutes);
app.use("/", taskRoutes);
app.use("/", listRoutes);

// Background Tasks and Error Handling
blacklistCleanupJob();
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 The server is live on port: ${PORT}`));
