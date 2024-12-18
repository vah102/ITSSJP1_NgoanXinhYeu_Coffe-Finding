import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import authRouter from './routers/authRouter.js';
import homeRouter from './routers/homeRouter.js';
import StoreDetailsRouter from './routers/StoreDetailsRouter.js';
import blacklistRouter from './routers/blacklistRouter.js'; 
import userRouter from './routers/userRouter.js';
import sequelize from './config/db.js';
 // Import middleware xác thực JWT (hoặc từ authController)

// Tạo app Express
const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true, // Cho phép gửi cookie
  };

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// Đăng ký các router không yêu cầu xác thực
app.use('/auth', authRouter);  // Dành cho đăng nhập, không cần authenticate
app.use('/api/home', homeRouter);
app.use('/api/store-details', StoreDetailsRouter); 
app.use('/api/blacklist', blacklistRouter);
app.use('/api/user', userRouter); // Dành cho user, cần authenticate

sequelize.authenticate().then(() => {
    console.log('Connection success!');
}).catch((error) => {
    console.error(error);
});

// Xuất app
export const viteNodeApp = app;

