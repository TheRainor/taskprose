import { useTranslation } from "react-i18next";

export function TaskItem({ task, onDelete, onToggle }) {
  const { t, i18n } = useTranslation();

  const locale = i18n.language?.toLowerCase().startsWith("tr")
    ? "tr-TR"
    : "en-US";
  const formatDate = (date) =>
    new Date(date).toLocaleString(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  const repeatLabel =
    (task.recurrence &&
      {
        daily: t("taskItem.repeatOptions.daily"),
        weekly: t("taskItem.repeatOptions.weekly"),
        monthly: t("taskItem.repeatOptions.monthly"),
        yearly: t("taskItem.repeatOptions.yearly"),
      }[task.recurrence]) ||
    "";

  return (
    <div
      className={`block w-full box-border max-w-full bg-white/10 rounded-xl p-4
      ${
        task.priority === "important"
          ? "border-2 border-yellow-400"
          : "border-white/20"
      }
      ${
        task.status === "planned"
          ? "border-2 border-purple-400"
          : "border-white/20"
      }
      border hover:bg-white/20 transition-all`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-3 flex-1 min-w-0 w-full">
          {task.status !== "completed" ? (
            <input
              type="checkbox"
              checked={false}
              onChange={() => onToggle(task.id)}
              className="w-5 h-5 task-checkbox flex-shrink-0"
              aria-label={t("taskItem.actions.delete")}
            />
          ) : (
            <input
              type="checkbox"
              checked
              disabled
              className="w-5 h-5 opacity-80 cursor-not-allowed flex-shrink-0"
            />
          )}

          <div className="min-w-0 w-full">
            <p
              className={`task-text text-white font-medium whitespace-normal break-all ${
                task.status === "completed" ? "line-through text-white/50" : ""
              }`}
            >
              {task.task_name}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 flex-shrink-0 ml-4">
          {task.priority === "important" && (
            <span className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full">
              {t("taskItem.important")}
            </span>
          )}

          {(task.due_date || task.alarm_time || task.recurrence) && (
            <div className="relative group">
              <button
                className="infoButton text-blue-500 text-xl"
                title="Info"
                aria-label="Info"
              >
                <i className="bi bi-info-circle-fill"></i>
              </button>
              <div className="hidden group-hover:block absolute w-max right-0 text-start bg-white/30 p-2 rounded text-white z-10">
                {task.alarm_time && (
                  <p>
                    {t("taskItem.info.remind")}: {formatDate(task.alarm_time)}
                  </p>
                )}
                {task.due_date && (
                  <p>
                    {t("taskItem.info.due")}: {formatDate(task.due_date)}
                  </p>
                )}
                {task.recurrence && (
                  <p>
                    {t("taskItem.info.repeat")}: {repeatLabel}
                  </p>
                )}
              </div>
            </div>
          )}

          <button
            onClick={() => onDelete(task.id)}
            className="text-red-600 text-xl cursor-pointer bg-transparent border-none"
            aria-label={t("taskItem.actions.delete")}
            title={t("taskItem.actions.delete")}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
