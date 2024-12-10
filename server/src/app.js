import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import authRouter from './routers/authRouter.js';
import homeRouter from './routers/homeRouter.js';
 // Import middleware xác thực JWT (hoặc từ authController)

// Tạo app Express
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Đăng ký các router không yêu cầu xác thực
app.use('/auth', authRouter);  // Dành cho đăng nhập, không cần authenticate
app.use('/api/home', homeRouter); 


// Xuất app
export const viteNodeApp = app;

