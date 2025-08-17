import { pool } from "../config/db.js";
import isEmail from 'validator/lib/isEmail.js';

export async function createUser(userData) {
  const [result] = await pool.execute(
    "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
    [userData.first_name, userData.last_name, userData.email, userData.password]
  );
  return result.insertId;
}


export async function findUserByEmail(rawEmail) {
  if (typeof rawEmail !== 'string') return null;
  const email = rawEmail.trim();

  if (!isEmail(email)) {
    return null;
  }
  const [rows] = await pool.execute(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email]
  );
  return rows[0] || null;
}

export async function findUserById(rawId) {
  const id = Number(rawId);
  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }
  const [rows] = await pool.execute(
    "SELECT * FROM users WHERE id = ? LIMIT 1",
    [id]
  );
  return rows[0] || null;
}