import { getTasksApi, getListTasksApi } from "../../api/index";
import { controlTokens } from "../auth/token-service";


const propMap = {
  all:       "resultAllTasks",
  today:     "resultTodayTasks",
  completed: "resultCompletedTasks",
  planned:   "resultPlannedTasks",
  important: "resultImportantTasks",
  listTasks: "resultListTasks",
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

export async function getTasks(type, listId = null) {
  
  try { 
    const { success, message, accessToken } = await controlTokens();

    if (!success) {
      throw new Error(message);
    }

    let data = {};
    if (type === "listTasks") { 
      data = await getListTasksApi(listId, accessToken);   
    } else {
      data = await getTasksApi(type, accessToken);
    }

    if (!data.success) {
      throw new Error(data.messageKey || "Tasks could not be retrieved");
    }
    
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
    return { data: [], error: err.messageKey || err.message};
  }
}
