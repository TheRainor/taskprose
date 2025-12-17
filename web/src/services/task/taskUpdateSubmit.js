import { updateTasksApi } from "../../api/index.js";
import { controlTokens } from "../index.js";
import { showMessage } from "../../utils/messageBox.js";

export async function taskUpdateSubmit(taskId, completed) {
  if (!taskId) return;

  const updates = {
    completed: completed || null,
  };

  try {
    const token = await controlTokens();

    if (!token.success) throw new Error(token.messageKey);

    const data = await updateTasksApi(updates, taskId, token.accessToken);

    showMessage(data.messageKey, "success");
  } catch (err) {
    showMessage(err.messageKey);
  }
}
