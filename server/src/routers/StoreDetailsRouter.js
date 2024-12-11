import express from 'express';

import storeController from '../controllers/storeController.js';
import userMiddleware from '../middlewares/userMiddleware.js';

const storeDetailsRouter = express.Router();

// Route: Lấy thông tin chi tiết của Store (bao gồm Menu và Feature)
// Middleware `userMiddleware` để kiểm tra người dùng đã đăng nhập
storeDetailsRouter.get('/:store_id', storeController.getStoreDetails);

export default storeDetailsRouter;