import { controlTokens } from "../index.js";
import { getTasksApi } from "../../api/index.js";

export async function getTasks(filter, navigate) {
  const keyMap = {
    all: "resultAllTasks",
    today: "resultTodayTasks",
    important: "resultImportantTasks",
    planned: "resultPlannedTasks",
    completed: "resultCompletedTasks",
  };

  try {
    const token = await controlTokens();

    if (token.success) {
      const data = await getTasksApi(filter);

      const { success } = data;
      if (!success) throw new Error("Görevler alınamadı");

      const key = keyMap[filter] || "resultAllTasks";
      const tasks = data[key] || [];

      return tasks;
    } else {
      navigate("/auth");
    }
  } catch (err) {
    navigate("/auth");
  }
}
