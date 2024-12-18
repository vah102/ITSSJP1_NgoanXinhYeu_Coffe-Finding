import express from 'express';
import authController from '../controllers/authController.js';

const authRouter = express.Router();

// Route đăng nhập
authRouter.post('/login', authController.login);

// Route đăng ký
authRouter.post('/register', authController.register);

//Route logout
authRouter.post('/logout', authController.logout);
export default authRouter;

