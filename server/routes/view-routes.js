import express from 'express';
import viewController from '../controllers/view-controller.js';
import { redirectLoggedInMiddleware, authenticateAccessTokenWeb } from '../middleware/auth-middleware.js';

const router = express.Router();

router.get('/', redirectLoggedInMiddleware, viewController.getAuthPage);
router.get('/to-do/all', authenticateAccessTokenWeb, viewController.getAllTasksPage);
router.get('/to-do/today', authenticateAccessTokenWeb, viewController.getTodayTasksPage);
router.get('/to-do/important', authenticateAccessTokenWeb, viewController.getImportantTasksPage);
router.get('/to-do/planned', authenticateAccessTokenWeb, viewController.getPlannedTasksPage);
router.get('/to-do/completed', authenticateAccessTokenWeb, viewController.getCompletedTasksPage);

router.use((req, res) => {
    res.status(404);
    viewController.get404Page(req, res);
  });

export default router;
