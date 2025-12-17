import express from 'express';
import * as authController from '../../controllers/auth-controller.js';
import { authenticateAccessToken } from '../../middleware/auth-middleware.js';

const router = express.Router();

router.post('/api/register', authController.userRegisterController);
router.post('/api/login', authController.userLoginController);
router.post('/api/logout', authController.userLogoutController);
router.post('/api/check-access', authenticateAccessToken, authController.checkAccessTokenController);
router.post('/api/refresh', authController.refreshTokenController);

export default router;
