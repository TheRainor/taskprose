import { controlTokens } from "../auth/token-service.js";
import { createTaskApi } from "../../api/task-api.js";
import { renderTaskList } from "./list-tasks.js";
import { showMessage } from "../../components/message-box.js";

export function taskFormSubmit(formData) {
  const form = document.querySelector(formData);
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      title: form.elements.title.value.trim().replace(/^./, (c) => c.toUpperCase()),
      description: form.elements.description.value.trim().replace(/^./, (c) => c.toUpperCase()),
      alarm: form.elements.alarm.value || null,
      date: form.elements.date.value || null,
      repeat: form.elements.repeat.value || null,
      activePage: form.elements.activePage.value,
    };

    try {
      const token = await controlTokens();

      if (token.success) {
        const data = await createTaskApi(payload);

        showMessage(data.message, "success");

        const currentPage = document.body.dataset.page;

        await renderTaskList("#taskList", currentPage);

        form.reset();
      }

      throw token.message;
    } catch (err) {
      showMessage(err.message, "error");
    }
  });
}
