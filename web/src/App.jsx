import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import {
  NotFound,
  HomePage,
  AuthPage,
  AllTasksPage,
  TodayTasksPage,
  ImportantTasksPage,
  PlannedTasksPage,
  CompletedTasksPage,
  ListPage,
  ListTasksPage,
} from "./pages/index.js";
import TodoLayout from "./pages/TodoLayout.jsx";
import { UserProvider } from "./contexts/userContext.jsx";

// Electron control
const isElectron = navigator.userAgent.toLowerCase().indexOf("electron/") !== -1;

const Router = isElectron ? HashRouter : BrowserRouter;

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/todo" element={<TodoLayout />}>
            <Route path="all" element={<AllTasksPage />} />
            <Route path="today" element={<TodayTasksPage />} />
            <Route path="important" element={<ImportantTasksPage />} />
            <Route path="planned" element={<PlannedTasksPage />} />
            <Route path="completed" element={<CompletedTasksPage />} />
            <Route path="lists" element={<ListPage />} />
            <Route path="lists/:id" element={<ListTasksPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
