import { createTaskApi } from "../../api/index.js";
import { controlTokens } from "../index.js";
import { showMessage } from "../../utils/messageBox.js";


export async function taskFormSubmit(formData) {

  const payload = {
    title: formData.get("title").trim().replace(/^./, (c) => c.toUpperCase()),
    description: formData.get("description").trim().replace(/^./, (c) => c.toUpperCase()),
    alarm: formData.get("alarm") || null,
    date: formData.get("date") || null,
    repeat: formData.get("repeat") || null,
    activePage: formData.get("activePage"),
  };

  try {
    const token = await controlTokens();

    if (token.success) {
      const data = await createTaskApi(payload);
      showMessage(data.message, "success");
    }
  } catch (err) {
    showMessage(err.message, "error");
  }
}
