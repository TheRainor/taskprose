import { pool } from "../config/db.js";

// Add token to blacklist
export async function addTokenToBlacklistModel(token, expiresAt) {
  const [result] = await pool.execute(
    "INSERT INTO blacklisted_tokens (token, expires_at) VALUES (?, ?)",
    [token, expiresAt]
  );
  return result.insertId;
}

// Checking token is blacklisted ?
export async function isTokenBlacklistedModel(token) {
  const [rows] = await pool.execute(
    "SELECT * FROM blacklisted_tokens WHERE token = ? LIMIT 1",
    [token]
  );
  
  return rows.length > 0;
}

// Clean up expired tokens
export async function cleanupExpiredTokens() {
  const [result] = await pool.execute(
    "DELETE FROM blacklisted_tokens WHERE expires_at < NOW()"
  );
  return result.affectedRows;
} 