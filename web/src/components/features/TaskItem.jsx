export function TaskItem({ task, onDelete, onToggle }) {
  const formatDate = (date) =>
    new Date(date).toLocaleString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  return (
    <div
      className={`block task-item w-full box-border max-w-full bg-white/10 rounded-xl p-4 
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
              className="w-5 h-5 task-checkbox mt-1 flex-shrink-0"
            />
          ) : (
            <input
              type="checkbox"
              checked
              disabled
              className="w-5 h-5 opacity-80 cursor-not-allowed mt-1 flex-shrink-0"
            />
          )}

          <div className="min-w-0 w-full">
            <p
              className={`task-text text-white font-medium whitespace-normal break-all ${
                task.status === "completed" ? "line-through text-white/50" : ""
              }`}
            >
              {task.title}
            </p>
            <p
              className={`text-white/80 text-sm whitespace-normal break-all ${
                task.status === "completed" ? "line-through" : ""
              }`}
            >
              {task.description}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 flex-shrink-0 ml-4">
          {task.priority === "important" && (
            <span className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded-full">
              Önemli
            </span>
          )}

          {(task.due_date || task.alarm_time || task.recurrence) && (
            <div className="relative group">
              <button className="infoButton text-blue-500 text-xl">
                <i className="bi bi-info-circle-fill"></i>
              </button>
              <div className="hidden group-hover:block absolute w-max right-0 text-start bg-white/30 p-2 rounded text-white">
                {task.alarm_time && (
                  <p>Anımsat: {formatDate(task.alarm_time)}</p>
                )}
                {task.due_date && <p>Son tarih: {formatDate(task.due_date)}</p>}
                {task.recurrence && (
                  <p>
                    Yineleme:{" "}
                    {task.recurrence === "daily"
                      ? "Günlük"
                      : task.recurrence === "weekly"
                      ? "Haftalık"
                      : task.recurrence === "monthly"
                      ? "Aylık"
                      : task.recurrence === "yearly"
                      ? "Yıllık"
                      : ""}
                  </p>
                )}
              </div>
            </div>
          )}

          <button
            onClick={() => onDelete(task.id)}
            className="delete-task-btn text-red-600 text-xl cursor-pointer bg-transparent border-none"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
