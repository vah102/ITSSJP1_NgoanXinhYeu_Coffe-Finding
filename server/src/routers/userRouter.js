import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

// Route yêu cầu phải đăng nhập mới có thể truy cập
userRouter.get('/profile', authMiddleware, (req, res) => {
    // Nếu tới đây, nghĩa là người dùng đã được xác thực
    res.json({ message: 'This is a protected profile route', user: req.user });
});

export default userRouter;
