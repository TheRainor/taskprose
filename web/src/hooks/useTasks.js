import { useEffect, useState } from "react";
import {
  taskFormSubmit,
  getTasks,
  taskUpdateSubmit,
  taskDeleteSubmit,
} from "../services/index.js";
import { useTaskCountsContext } from "../contexts/useTaskCountsContext.jsx";

export const useTasks = (filter, navigate) => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [alarm, setAlarm] = useState("");
  const [alarmValue, setAlarmValue] = useState("");
  const [date, setDate] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [repeat, setRepeat] = useState("");
  const [repeatValue, setRepeatValue] = useState("");
  const { refreshCounts } = useTaskCountsContext();

  // Form clear function
  const clearForm = () => {
    setTitle("");
    setDescription("");
    setAlarm("");
    setAlarmValue("");
    setDate("");
    setDateValue("");
    setRepeat("");
    setRepeatValue("");
  };

  // Initial fetch of tasks based on filter
  useEffect(() => {
    (async () => {
      const fetchedTasks = await getTasks(filter, navigate);
      setTasks(fetchedTasks);
    })();
  }, []);

  // Handlers
  const handleToggle = async (taskId) => {
    const completed = "completed";
    await taskUpdateSubmit(taskId, completed);
    const fetchedTasks = await getTasks(filter, navigate);
    setTasks(fetchedTasks);
    refreshCounts();
  };

  const handleDelete = async (taskId) => {
    await taskDeleteSubmit(taskId);
    const fetchedTasks = await getTasks(filter, navigate);
    setTasks(fetchedTasks);
    refreshCounts();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await taskFormSubmit(formData);
    clearForm();
    const fetchedTasks = await getTasks(filter, navigate);
    setTasks(fetchedTasks);
    refreshCounts();
  };

  return {
    tasks,
    handleSubmit,
    handleToggle,
    handleDelete,
    setTasks,
    title,
    setTitle,
    description,
    setDescription,
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
    clearForm,
  };
};
