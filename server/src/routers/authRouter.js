import express from 'express';
import authController from '../controllers/authController.js';

const authRouter = express.Router();

// Route đăng nhập
authRouter.post('/login', authController.login);

export default authRouter;

