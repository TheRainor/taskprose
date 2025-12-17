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
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173", "file://"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/", authRoutes);
app.use("/", taskRoutes);
app.use("/", listRoutes);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

blacklistCleanupJob();
app.use(errorHandler);

const PORT = process.env.WEB_PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
