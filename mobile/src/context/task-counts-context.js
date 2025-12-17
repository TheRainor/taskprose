import { createContext, useContext, useState, useEffect } from "react";
import { controlTokens } from "../services/index.js";
import { getTaskCountsApi } from "../api/index.js";
import { useRefresh } from "./refresh-context.js";

const TaskCountsContext = createContext();

export const useTaskCountsContext = () => {
  const context = useContext(TaskCountsContext);
  if (!context)
    throw new Error(
      "useTaskCountsContext must be used within a TaskCountsProvider"
    );
  return context;
};

export const TaskCountsProvider = ({ children }) => {
  const { refreshKey } = useRefresh();
  const [counts, setCounts] = useState({
    count_all: 0,
    count_today: 0,
    count_important: 0,
    count_planned: 0,
    count_completed: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchAllCounts = async () => {
    try {
      setLoading(true);

      const { success, accessToken } = await controlTokens();
      if (!success) {
        setCounts({
          count_all: 0,
          count_today: 0,
          count_important: 0,
          count_planned: 0,
          count_completed: 0,
        });
        return;
      }

      const res = await getTaskCountsApi(accessToken);

      if (res.success) {
        setCounts(res.counts);
      }
    } catch (error) {
      setCounts({
        count_all: 0,
        count_today: 0,
        count_important: 0,
        count_planned: 0,
        count_completed: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ refreshKey değiştiğinde counts'u yeniden çek
  useEffect(() => {
    fetchAllCounts();
  }, [refreshKey]);

  const updateCount = (filter, value) => {
    setCounts((prev) => ({
      ...prev,
      [`count_${filter}`]: value,
    }));
  };

  const value = {
    counts,
    loading,
    refreshCounts: fetchAllCounts,
    updateCount,
  };

  return (
    <TaskCountsContext.Provider value={value}>
      {children}
    </TaskCountsContext.Provider>
  );
};
