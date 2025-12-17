import { createTaskApi, createListTaskApi } from "../../api/index.js";
import { controlTokens } from "../index.js";
import { showMessage } from "../../utils/messageBox.js";

export async function taskFormSubmit(formData, listId = null) {
  const payload = {
    taskName: formData.get("taskName").trim().replace(/^./, (c) => c.toUpperCase()),
    alarm: formData.get("alarm") || null,
    date: formData.get("date") || null,
    repeat: formData.get("repeat") || null,
    priority: formData.get("priority") || null,
  };

  try {
    const token = await controlTokens();

    if (token.success) {
      let data = {};
      if (listId) {
        data = await createListTaskApi(payload, listId, token.accessToken);
      } else {
        data = await createTaskApi(payload, token.accessToken);
      }

      showMessage(data.messageKey, "success");
    }
  } catch (err) {
    showMessage(err.messageKey, "error");
  }
}
