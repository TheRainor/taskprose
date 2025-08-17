import { loginFormSubmit } from './modules/auth/login-form.js';
import { registerFormSubmit } from './modules/auth/register-form.js';
import { taskFormSubmit } from './modules/tasks/task-form.js';
import { renderTaskList } from './modules/tasks/list-tasks.js';
import { logoutFormSubmit } from './modules/auth/logout-form.js';
import { taskUpdateSubmit } from './modules/tasks/task-update.js';
import { taskDeleteSubmit } from './modules/tasks/task-delete.js';

loginFormSubmit('#loginForm');
registerFormSubmit('#registerForm');
logoutFormSubmit('#logoutForm')
taskFormSubmit('#taskForm');
taskUpdateSubmit('.task-checkbox');
taskDeleteSubmit('.delete-task-btn');

// 2) Yalnızca liste sayfalarına özgü init
const page = document.body.dataset.page;
switch (page) {
  case 'all':
    renderTaskList('#taskList', 'all');
    break;
  case 'today':
    renderTaskList('#taskList', 'today');
    break;
  case 'planned':
    renderTaskList('#taskList', 'planned');
    break;
  case 'important':
    renderTaskList('#taskList', 'important');
    break;
  case 'completed':
    renderTaskList('#taskList', 'completed');
    break;
  default:
    break;
}
