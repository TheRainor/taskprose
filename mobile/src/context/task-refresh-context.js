import { createContext, useContext, useState } from "../libs/index";

const TaskRefreshContext = createContext();

export const TaskRefreshProvider = ({ children }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <TaskRefreshContext.Provider value={{ refreshKey, triggerRefresh }}>
      {children}
    </TaskRefreshContext.Provider>
  );
};

export const useTaskRefresh = () => useContext(TaskRefreshContext);