import { deleteTasksApi } from "../../api/index.js";
import { controlTokens } from "../index.js";
import { showMessage } from "../../utils/messageBox.js";

export async function taskDeleteSubmit(taskId) {
  if (!taskId) return;

  try {
    const token = await controlTokens();

    if (!token.success) throw new Error(token.message);

    const data = await deleteTasksApi(taskId);
    showMessage(data.message, "success");
  } catch (err) {
    showMessage(err.message);
  }
}
