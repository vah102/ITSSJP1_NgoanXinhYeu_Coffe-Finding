import express from 'express';
import cors from 'cors';
import homeRouter from './routers/homeRouter.js';
import storeDetailsRouter from './routers/storeDetailsRouter.js';
import authRouter from './routers/authRouter.js';
import blacklistRouter from './routers/blacklistRouter.js';
import authMiddleware from './middlewares/authMiddleware.js'; // Import middleware xác thực JWT (hoặc từ authController)

// Tạo app Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Đăng ký các router không yêu cầu xác thực
app.use('/auth', authRouter);  // Dành cho đăng nhập, không cần authenticate

// Đăng ký các router yêu cầu xác thực
app.use('/api', authMiddleware, homeRouter);  // Thêm authMiddleware vào để bảo vệ route
app.use('/api/store', authMiddleware, storeDetailsRouter);
app.use('/api/blacklist', authMiddleware, blacklistRouter)  // Cũng có thể bảo vệ các route khác

// Xuất app
export const viteNodeApp = app;

