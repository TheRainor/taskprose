import { pool } from "../config/db.js";


export async function createTask(userId, title, description, alarmFormatted, dueFormatted, recurrence, status) {
  const [result] = await pool.execute(
    "INSERT INTO todos (user_id, title, description, alarm_time, due_date, recurrence, status) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [userId, title, description, alarmFormatted, dueFormatted, recurrence, status]
  );
  return result;
}


export async function showAllTasks(userId) {
  const [result] = await pool.execute(
    `SELECT * FROM todos
     WHERE user_id = ? AND is_deleted = 0
     ORDER BY (status = 'completed') ASC, created_at DESC`,
    [userId]
  );
  return result;
}


export async function showTodayTasks(userId) {
  const [result] = await pool.execute(
    `SELECT * FROM todos 
    WHERE user_id = ? AND is_deleted = 0 
    AND DATE(created_at) = CURDATE() 
    ORDER BY (status = 'completed') ASC, created_at DESC`,
    [userId]
  );
  return result;
}


export async function showImportantTasks(userId) {
  const [result] = await pool.execute(
    `SELECT * FROM todos 
    WHERE user_id = ? AND is_deleted = 0 
    AND priority IN ('important') 
    ORDER BY (status = 'completed') ASC, created_at DESC`,
    [userId]
  );
  return result;
}


export async function showPlannedTasks(userId) {
  const [result] = await pool.execute(
    `SELECT * FROM todos 
    WHERE user_id = ? AND is_deleted = 0 
    AND status = 'planned' 
    ORDER BY (status = 'completed') ASC, created_at DESC`,
    [userId]
  );
  return result;
}


export async function showCompletedTasks(userId) {
  const [result] = await pool.execute(
    `SELECT * FROM todos 
    WHERE user_id = ? AND is_deleted = 0 
    AND status = 'completed' 
    ORDER BY updated_at DESC`,
    [userId]
  );
  return result;
}

export async function getTaskCounts(userId) {
  const [result] = await pool.execute(
    `SELECT 
       COUNT(*) AS count_all,
       SUM(CASE WHEN DATE(created_at) = CURDATE() THEN 1 ELSE 0 END) AS count_today,
       SUM(CASE WHEN priority = 'important' THEN 1 ELSE 0 END) AS count_important,
       SUM(CASE WHEN status = 'planned' THEN 1 ELSE 0 END) AS count_planned,
       SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS count_completed
     FROM todos 
     WHERE user_id = ? AND is_deleted = 0`,
    [userId]
  );
  return result[0];
}

export async function updateTask(id, completed) {
  const [result] = await pool.execute(
    "UPDATE todos SET status = ? WHERE id = ?",
    [completed, id]
  );
  return result;
}

export async function deleteTask(id) {
  const [result] = await pool.execute(
    "DELETE FROM todos WHERE id = ?",
    [id]
  );
  return result;
}