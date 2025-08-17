import { controlTokens } from "../auth/token-service.js";
import { updateTasksApi } from "../../api/task-api.js";
import { renderTaskList } from "./list-tasks.js";
import { showMessage } from "../../components/message-box.js";

export function taskUpdateSubmit(selector) {
  document.addEventListener("change", async (e) => {
    if (!e.target.matches(selector)) return;

    const taskId = e.target.dataset.taskId;

    if (!taskId) return;

    const updates = {
      // Updates will come here
    };

    try {
      const token = await controlTokens();

      if (!token.success) throw new Error(token.message);

      const data = await updateTasksApi(updates, taskId);

      const currentPage = document.body.dataset.page;

      await renderTaskList("#taskList", currentPage);

      showMessage(data.message, "success");
    } catch (err) {
      showMessage(err.message);
    }
  });
}
