import { pool } from "./db.js";
import fs from "fs/promises";
import path from "path";

async function runMigration() {
  try {
    const sqlPath = path.join(process.cwd(), "taskprose_db.sql");
    const sql = await fs.readFile(sqlPath, "utf8");

    console.log("🚀 Transferring SQL data...");

    await pool.query(sql);

    console.log("✅ Operation successful! Tables and data have been loaded.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

runMigration();
