import { useEffect, useState } from "react";
import {
  taskFormSubmit,
  getTasks,
  taskUpdateSubmit,
  taskDeleteSubmit,
} from "../services/index.js";
import { useTaskCountsContext } from "../contexts/useTaskCountsContext.jsx";
import { useUser } from "../contexts/userContext.jsx";

export const useTasks = (filter, navigate, listId = null) => {
  const { setUser } = useUser();
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [alarm, setAlarm] = useState("");
  const [alarmValue, setAlarmValue] = useState("");
  const [date, setDate] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [repeat, setRepeat] = useState("");
  const [repeatValue, setRepeatValue] = useState("");
  const [isImportant, setIsImportant] = useState("");
  const { refreshCounts } = useTaskCountsContext();

  // Form clear arrow function
  const clearForm = () => {
    setTaskName("");
    setAlarm("");
    setAlarmValue("");
    setDate("");
    setDateValue("");
    setRepeat("");
    setRepeatValue("");
    setIsImportant("");
  };

  // Initial fetch of tasks based on filter
  useEffect(() => {
    (async () => {
      const { tasks, user } = await getTasks(filter, navigate, listId);
      const { first_name, last_name, email } = user;
      setUser({ first_name, last_name, email });
      setTasks(tasks);
    })();
  }, []);

  // Handlers
  const handleToggle = async (taskId) => {
    const completed = "completed";
    await taskUpdateSubmit(taskId, completed);
    const { tasks } = await getTasks(filter, navigate, listId);
    setTasks(tasks);
    refreshCounts();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await taskFormSubmit(formData, listId);
    clearForm();
    const { tasks } = await getTasks(filter, navigate, listId);
    setTasks(tasks);
    refreshCounts();
  };

  const handleDelete = async (taskId) => {
    await taskDeleteSubmit(taskId);
    const { tasks } = await getTasks(filter, navigate, listId);
    setTasks(tasks);
    refreshCounts();
  };

  return {
    tasks,
    handleSubmit,
    handleToggle,
    handleDelete,
    setTasks,
    taskName,
    setTaskName,
    alarm,
    setAlarm,
    alarmValue,
    setAlarmValue,
    date,
    setDate,
    dateValue,
    setDateValue,
    repeat,
    setRepeat,
    repeatValue,
    setRepeatValue,
    isImportant,
    setIsImportant,
    clearForm,
  };
};
