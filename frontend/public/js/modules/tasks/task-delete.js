import { controlTokens } from "../auth/token-service.js";
import { deleteTasksApi } from "../../api/task-api.js";
import { renderTaskList } from "./list-tasks.js";
import { showMessage } from "../../components/message-box.js";

export function taskDeleteSubmit(selector) {   
  document.addEventListener("click", async (e) => {
    if (!e.target.matches(selector)) return;

    const taskId = e.target.dataset.taskId;
    if (!taskId) return;

    try {
      const token = await controlTokens();

      if (!token.success) throw new Error(token.message);

      const data = await deleteTasksApi(taskId);

      const currentPage = document.body.dataset.page;

      await renderTaskList("#taskList", currentPage);

      showMessage(data.message, "success");
    } catch (err) {
      showMessage(err.message);
    }
  });
}