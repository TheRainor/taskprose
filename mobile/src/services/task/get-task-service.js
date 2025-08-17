import { getTasksApi } from "../../api/index";
import { controlTokens } from "../auth/token-service";


const propMap = {
  all:       "resultAllTasks",
  today:     "resultTodayTasks",
  completed: "resultCompletedTasks",
  planned:   "resultPlannedTasks",
  important: "resultImportantTasks",
};

const recurrenceMap = {
  daily: "Günlük",
  weekly: "Haftalık",
  monthly: "Aylık",
  yearly: "Yıllık",
};

const formatDateTR = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}.${month}.${year} - ${hours}:${minutes}`;
};

export async function getTasks(type) {
  try { 
    const { success, message, accessToken } = await controlTokens();

    if (!success) {
      throw new Error(message);
    }

    const data = await getTasksApi(type, accessToken);
    const key = propMap[type];
    let result = data[key] || [];

    result = result.map(task => ({
      ...task,
      alarm_time: task.alarm_time ? formatDateTR(task.alarm_time) : "",
      due_date: task.due_date ? formatDateTR(task.due_date) : "",
      recurrence: task.recurrence ? (recurrenceMap[task.recurrence] || task.recurrence) : ""
    }));

    return { data: result, error: null };

  } catch (err) {
    return { data: [], error: err.message };
  }
}
