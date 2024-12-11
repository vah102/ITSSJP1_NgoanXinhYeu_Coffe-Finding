import express from 'express';
import storeController from '../controllers/storeController.js';
import userMiddleware from '../middlewares/userMiddleware.js';

const homeRouter = express.Router();

// Lấy danh sách tất cả các cửa hàng
// homeRouter.get('/stores', storeController.getAllStores);

// Lấy danh sách các cửa hàng có rate > 4.0
homeRouter.get('/stores', userMiddleware, storeController.getStoresByRate);

// Lấy thông tin cửa hàng theo ID
homeRouter.get('/stores/:id', storeController.getStoreById);

homeRouter.get('/search-filter', userMiddleware,storeController.getStores);

export default homeRouter;
