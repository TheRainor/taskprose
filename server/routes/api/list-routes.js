import express from 'express';
import * as listController from '../../controllers/list-controller.js';
import * as taskController from '../../controllers/task-controller.js';
import { authenticateAccessToken } from '../../middleware/auth-middleware.js';
const router = express.Router();

router.post('/api/lists', authenticateAccessToken, listController.createListController);
router.get('/api/lists', authenticateAccessToken, listController.getListsController);
router.delete('/api/delete/lists/:id', authenticateAccessToken, listController.deleteListController);

router.post('/api/list/tasks', authenticateAccessToken, taskController.createTaskController);
router.get('/api/list/tasks', authenticateAccessToken, listController.getListTasksController);
router.get('/api/lists/counts', authenticateAccessToken, listController.getListCountsController);

export default router;