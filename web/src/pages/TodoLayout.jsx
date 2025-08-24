import { Outlet } from "react-router-dom";
import { TaskCountsProvider } from "../contexts/useTaskCountsContext.jsx";

export default function TodoLayout() {
  return (
    <TaskCountsProvider>
      <Outlet />
    </TaskCountsProvider>
  );
}