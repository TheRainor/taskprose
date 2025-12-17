import { pool } from "../config/db.js";

export async function createTask(
  userId,
  listId,
  taskName,
  alarmFormatted,
  dueFormatted,
  recurrence,
  status,
  priority
) {
  
  const [result] = await pool.execute(
    "INSERT INTO todos (user_id, list_id, task_name, alarm_time, due_date, recurrence, status, priority) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      userId,
      listId,
      taskName,
      alarmFormatted,
      dueFormatted,
      recurrence,
      status,
      priority,
    ]
  );
  return result;
}

export async function showAllTasks(userId) {
  const [result] = await pool.execute(
    `SELECT * FROM todos
     WHERE user_id = ? AND is_deleted = 0 And list_id IS NULL
     ORDER BY (status = 'completed') ASC, created_at DESC`,
    [userId]
  );
  return result;
}

export async function showTodayTasks(userId) {
  const [result] = await pool.execute(
    `SELECT * FROM todos 
    WHERE user_id = ? AND is_deleted = 0 And list_id IS NULL
    AND DATE(created_at) = CURDATE() 
    ORDER BY (status = 'completed') ASC, created_at DESC`,
    [userId]
  );
  return result;
}

export async function showImportantTasks(userId) {
  const [result] = await pool.execute(
    `SELECT * FROM todos 
    WHERE user_id = ? AND is_deleted = 0 And list_id IS NULL
    AND priority IN ('important') 
    ORDER BY (status = 'completed') ASC, created_at DESC`,
    [userId]
  );
  return result;
}

export async function showPlannedTasks(userId) {
  const [result] = await pool.execute(
    `SELECT * FROM todos 
    WHERE user_id = ? AND is_deleted = 0 And list_id IS NULL
    AND status = 'planned' 
    ORDER BY (status = 'completed') ASC, created_at DESC`,
    [userId]
  );
  return result;
}

export async function showCompletedTasks(userId) {
  const [result] = await pool.execute(
    `SELECT * FROM todos 
    WHERE user_id = ? AND is_deleted = 0 And list_id IS NULL
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
     WHERE user_id = ? AND is_deleted = 0 And list_id IS NULL`,
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
  const [result] = await pool.execute("DELETE FROM todos WHERE id = ?", [id]);
  return result;
}

export async function createList(userId, listName) {
  const [result] = await pool.execute(
    "INSERT INTO lists (user_id, list_name) VALUES (?, ?)",
    [userId, listName]
  );
  return result;
}

export async function getLists(userId) {
  const [result] = await pool.execute(
    `SELECT * FROM lists
     WHERE user_id = ?
     ORDER BY created_at DESC`,
    [userId]
  );
  return result;
}

export async function getListCounts(userId) {
  const [result] = await pool.execute(
    `SELECT 
       COUNT(*) AS list_count
     FROM lists 
     WHERE user_id = ?`,
    [userId]
  );
  return result[0];
}

export async function getListTasks(userId, listId) {
  const [result] = await pool.execute(
    `SELECT * FROM todos
     WHERE user_id = ? AND list_id = ?
     ORDER BY (status = 'completed') ASC, created_at DESC`,
    [userId, listId]
  );
  return result;
}

export async function deleteList(id) {
  const [result] = await pool.execute("DELETE FROM lists WHERE id = ?", [id]);
  return result;
}

export async function deleteListTasks(listId) {
  const [result] = await pool.execute("DELETE FROM todos WHERE list_id = ?", [
    listId,
  ]);
  return result;
}
