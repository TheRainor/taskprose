import { Navbar, Sidebar, TaskAdd } from "../components/index.js";
import { useTasks } from "../hooks/index.js";
import { TaskItem } from "../components/index.js";
import { useNavigate } from "react-router-dom";

export default function TodayTasksPage() {
  const filter = "today";
  const navigate = useNavigate();
  const {
    tasks,
    title,
    description,
    alarm,
    alarmValue,
    date,
    dateValue,
    repeat,
    repeatValue,
    setTitle,
    setDescription,
    setAlarm,
    setAlarmValue,
    setDate,
    setDateValue,
    setRepeat,
    setRepeatValue,
    handleSubmit,
    handleToggle,
    handleDelete,
  } = useTasks(filter, navigate);
  return (
    <div
      data-page="today"
      className="bg-gradient-to-br from-indigo-950 via-slate-900 to-gray-900 min-h-screen"
    >
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          <Sidebar />

          <div className="flex-1">
            {/* Task Add */}
            <TaskAdd
              handleSubmit={handleSubmit}
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              alarm={alarm}
              setAlarm={setAlarm}
              alarmValue={alarmValue}
              setAlarmValue={setAlarmValue}
              date={date}
              setDate={setDate}
              dateValue={dateValue}
              setDateValue={setDateValue}
              repeat={repeat}
              setRepeat={setRepeat}
              repeatValue={repeatValue}
              setRepeatValue={setRepeatValue}
            />

            {/* Task List */}
            <div className="task-list-container bg-white/10 glass rounded-2xl p-6 border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Bugünkü Görevler
                </h2>
                <div className="flex space-x-2">
                  <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
                      ></path>
                    </svg>
                  </button>
                  <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="space-y-3 max-h-[327px] overflow-y-auto">
                {tasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onDelete={handleDelete}
                    onToggle={handleToggle}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
