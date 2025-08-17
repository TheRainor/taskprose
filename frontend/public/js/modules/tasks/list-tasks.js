import { controlTokens } from "../auth/token-service.js";
import { getTasksApi } from "../../api/task-api.js";
import { showMessage } from "../../components/message-box.js";

/**
 * @param {string} containerSelector
 * @param {string} filter
 */
export async function renderTaskList(containerSelector, filter) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = `<div class="text-center text-white/70">Yükleniyor…</div>`;

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

      container.innerHTML = "";

      const key = keyMap[filter] || "resultAllTasks";
      const tasks = data[key] || [];

      if (!tasks.length) {
        container.innerHTML = `
        <div class="text-center text-white/70">
          Görev bulunamadı.
        </div>`;
        return;
      }

      tasks.forEach((task) => {
        const div = document.createElement("div");
        div.className = `
          block task-item w-full box-border max-w-full bg-white/10 rounded-xl p-4 
          ${
            task.priority === "important"
              ? "border-2 border-yellow-400"
              : "border-white/20"
          } 
          border hover:bg-white/20 transition-all
        `;

        div.innerHTML = `
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center space-x-3 flex-1 min-w-0 w-full">
            ${
              task.status !== "completed"
                ? `<input
                    data-task-id="${task.id}"
                    type="checkbox"
                    class="w-5 h-5 task-checkbox mt-1 flex-shrink-0"
                  />`
                : `<input
                    type="checkbox"
                    checked
                    disabled
                    class="w-5 h-5 opacity-80 cursor-not-allowed mt-1 flex-shrink-0"
                  />`
            }

            <div class="min-w-0 w-full">
              <p class="task-text text-white font-medium whitespace-normal break-all ${
                task.status === "completed" ? "line-through text-white/50" : ""
              }">
                ${task.title}
              </p>
              <p class="text-white/80 text-sm whitespace-normal break-all ${
                task.status === "completed" ? "line-through" : ""
              }">
                ${task.description}
              </p>
            </div>
          </div>

          <div class="flex items-center space-x-3 flex-shrink-0 ml-4">
            ${
              task.priority === "important"
                ? `<span class="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full">Önemli</span>`
                : ""
            }
                    <div class="relative">
              <button class="infoButton text-blue-500 text-xl ${
                !task.due_date && !task.alarm_time && !task.recurrence
                  ? "hidden"
                  : ""
              }">
                <i class="bi bi-info-circle-fill"></i>
              </button>
              <div class="infoDiv hidden absolute w-max right-0 text-start bg-white/30 p-2 rounded text-white">
  ${
    task.alarm_time
      ? `<p>Anımsat: ${new Date(task.alarm_time).toLocaleString("tr-TR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}</p>`
      : ""
  }
  ${
    task.due_date
      ? `<p>Son tarih: ${new Date(task.due_date).toLocaleString("tr-TR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}</p>`
      : ""
  }
  ${
    task.recurrence
      ? `<p>Yineleme: ${
          task.recurrence === "daily"
            ? "Günlük"
            : task.recurrence === "weekly"
            ? "Haftalık"
            : task.recurrence === "monthly"
            ? "Aylık"
            : task.recurrence === "yearly"
            ? "Yıllık"
            : ""
        }</p>`
      : ""
  }
            </div>
          </div>

                <input 
                type="button" 
                value="✕" 
                data-task-id="${task.id}" 
                class="delete-task-btn text-red-600 text-xl cursor-pointer bg-transparent border-none"
              />
          </div>
        </div>
      `;
        container.appendChild(div);
      });
    }
  } catch (err) {
    showMessage(err.message, "error");
  }
}

document.addEventListener("click", (e) => {
  const button = e.target.closest(".infoButton");
  if (button) {
    const taskItem = button.closest(".task-item");
    const infoDiv = taskItem.querySelector(".infoDiv");
    if (infoDiv) {
      infoDiv.classList.toggle("hidden");
    }
  }
  if (!e.target.closest(".relative")) {
    document
      .querySelectorAll(".infoDiv")
      .forEach((d) => d.classList.add("hidden"));
  }
});
