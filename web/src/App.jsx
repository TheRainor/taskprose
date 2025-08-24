import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  NotFound,
  AuthPage,
  AllTasksPage,
  TodayTasksPage,
  ImportantTasksPage,
  PlannedTasksPage,
  CompletedTasksPage,
} from "./pages/index.js";
import TodoLayout from "./pages/TodoLayout.jsx";
import { UserProvider } from "./contexts/userContext.jsx";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/todo" element={<TodoLayout />}>
            <Route path="all" element={<AllTasksPage />} />
            <Route path="today" element={<TodayTasksPage />} />
            <Route path="important" element={<ImportantTasksPage />} />
            <Route path="planned" element={<PlannedTasksPage />} />
            <Route path="completed" element={<CompletedTasksPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
