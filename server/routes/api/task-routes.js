import express from 'express';
import * as taskController from '../../controllers/task-controller.js';
import { authenticateAccessToken } from '../../middleware/auth-middleware.js';
const router = express.Router();

router.post('/api/tasks', authenticateAccessToken, taskController.createTaskController);

router.put('/api/update/tasks/:id', authenticateAccessToken, taskController.updateTaskController);

router.delete('/api/delete/tasks/:id', authenticateAccessToken, taskController.deleteTaskController);

router.get('/api/tasks/all', authenticateAccessToken, taskController.getAllTasksController);
router.get('/api/tasks/today', authenticateAccessToken, taskController.getTodayTasksController);
router.get('/api/tasks/important', authenticateAccessToken, taskController.getImportantTasksController);
router.get('/api/tasks/planned', authenticateAccessToken, taskController.getPlannedTasksController);
router.get('/api/tasks/completed', authenticateAccessToken, taskController.getCompletedTasksController);
router.get('/api/tasks/counts', authenticateAccessToken, taskController.getTaskCountsController);

export default router;
