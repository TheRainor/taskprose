import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import authRoutes from './routes/api/auth-routes.js';
import taskRoutes from './routes/api/task-routes.js';
import { errorHandler } from "./middleware/error-handler.js";
import { blacklistCleanupJob } from "./jobs/blacklist-cleanup-job.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

app.use(express.static(path.join(__dirname, "../frontend")));
app.set("views", path.join(__dirname, "../frontend/views"));
app.set("view engine", "ejs");

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/", authRoutes);
app.use("/", taskRoutes);


// Gelen tüm istekleri loglamak (isteğe bağlı)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

blacklistCleanupJob();
app.use(errorHandler);
const PORT = process.env.WEB_PORT;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
