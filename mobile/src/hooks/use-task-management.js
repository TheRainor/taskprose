import { useState, useCallback, useFocusEffect } from "../libs/index";
import { getTasks, controlTokens, updateFormSubmit, deleteFormSubmit } from "../services/index";
import { useTaskRefresh, useMessageContext } from "../context/index";

export function useTaskManagement(navigation, type) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refreshKey, triggerRefresh } = useTaskRefresh();
  const { showSuccess, showError } = useMessageContext();

  // Auth control + get task
  useFocusEffect(
    useCallback(() => {
      const checkAuthAndFetch = async () => {
        const { accessToken } = await controlTokens();
        if (!accessToken) {
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
          return;
        }

        setLoading(true);
        const { data, error } = await getTasks(type);
        setTasks(data);
        navigation.setParams({ errorMessage: error });
        setLoading(false);
      };

      checkAuthAndFetch();
    }, [navigation, type, refreshKey])
  );

  // Complete the task
  const handleCheckbox = async (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: "completed" } : task
      )
    );
    try {
      const message = await updateFormSubmit(taskId);
      triggerRefresh();
      showSuccess(message);
    } catch (err) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, status: "in_progress" } : task
        )
      );
      showError(err.message);
    }
  };

  // Delete the task
  const handleDelete = async (taskId) => {
    try {
      const message = await deleteFormSubmit(taskId);
      triggerRefresh();
      showSuccess(message);
    } catch (err) {
      showError(err.message);
    }
  };

  return {
    tasks,
    setTasks,
    loading,
    handleCheckbox,
    handleDelete,
  };
}
