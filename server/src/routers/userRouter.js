import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import userController from '../controllers/userController.js';

const userRouter = express.Router();

// Route yêu cầu phải đăng nhập mới có thể truy cập
userRouter.get('/profile', authMiddleware, userController.getUserProfile);

userRouter.put('/update', authMiddleware, userController.updateUserProfile);
export default userRouter;
