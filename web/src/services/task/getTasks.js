import { controlTokens } from "../index.js";
import { getTasksApi, getListTasksApi } from "../../api/index.js";

export async function getTasks(filter, navigate, listId = null) {
  const keyMap = {
    all: "resultAllTasks",
    today: "resultTodayTasks",
    important: "resultImportantTasks",
    planned: "resultPlannedTasks",
    completed: "resultCompletedTasks",
    listTasks: "resultListTasks",
  };
  
  try {
    const token = await controlTokens();

    if (token.success) {
      let data = {};
      if (filter === "listTasks") {
        data = await getListTasksApi(listId, token.accessToken);
      } else {
        data = await getTasksApi(filter, token.accessToken);
      }

      const { success } = data;
      if (!success) throw new Error("Görevler alınamadı");

      const key = keyMap[filter] || "resultAllTasks";
      const tasks = data[key] || [];
      const user = {
        email: token.email,
        first_name: token.first_name,
        last_name: token.last_name,
      };
      return { tasks, user };
    } else {
      navigate("/auth");
    }
  } catch (err) {
    navigate("/auth");
  }
}
