import { Outlet } from "react-router-dom";
import { TaskCountsProvider } from "../contexts/useTaskCountsContext.jsx";
import { ListCountsProvider } from "../contexts/useListCountsContext.jsx";

export default function TodoLayout() {
  return (
    <TaskCountsProvider>
      <ListCountsProvider>
        <Outlet />
      </ListCountsProvider>
    </TaskCountsProvider>
  );
}
