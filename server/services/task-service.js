import { createTask, updateTask, deleteTask } from "../models/todo-model.js";

// Helper function
function formatForMySQL(dt) {
  if (!dt) return null;
  return dt.toISOString().slice(0, 19).replace("T", " ");
}

// Create task service
export async function createTaskService(
  userId,
  listId = null,
  taskName,
  alarmKey,
  dateKey,
  repeat,
  priority
) {
  const now = new Date();

  // --- Alarm time calculation ---
  let alarmTime = null;
  if (alarmKey) {
    if (alarmKey === "today") {
      alarmTime = new Date(now);
      alarmTime.setHours(now.getHours() + 3);
    } else if (alarmKey === "tomorrow") {
      alarmTime = new Date(now);
      alarmTime.setDate(now.getDate() + 1);
    } else if (alarmKey === "nextweek") {
      alarmTime = new Date(now);
      alarmTime.setDate(now.getDate() + 7);
    } else {
      alarmTime = new Date(alarmKey);
    }
  }

  // --- Due date calculation ---
  let dueDate = null;
  if (dateKey) {
    if (dateKey === "tomorrow") {
      dueDate = new Date(now);
      dueDate.setDate(now.getDate() + 1);
    } else if (dateKey === "nextweek") {
      dueDate = new Date(now);
      dueDate.setDate(now.getDate() + 7);
    } else {
      dueDate = new Date(dateKey);
    }
  }

  // --- Prepare formats ---
  const alarmFormatted = formatForMySQL(alarmTime);
  const dueFormatted = formatForMySQL(dueDate);
  const recurrence = repeat || null;

  // --- Save to database ---
  const status = alarmFormatted || dueFormatted ? "planned" : null;
  if (priority !== "important") priority = "normal";

  const result = await createTask(
    userId,
    listId,
    taskName,
    alarmFormatted,
    dueFormatted,
    recurrence,
    status,
    priority
  );

  return result;
}

// Update task service
export async function updateTaskService(id, completed) {
  if (completed) {
    const result = await updateTask(id, completed);
    return result;
  }
}

// Delete task service
export async function deleteTaskService(id) {
  const result = await deleteTask(id);
  return result;
}
