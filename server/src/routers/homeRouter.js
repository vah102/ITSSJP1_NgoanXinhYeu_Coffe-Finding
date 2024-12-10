import express from 'express';
import storeController from '../controllers/storeController.js';

const homeRouter = express.Router();

// Lấy danh sách tất cả các cửa hàng
// homeRouter.get('/stores', storeController.getAllStores);

// Lấy danh sách các cửa hàng có rate > 4.0
homeRouter.get('/stores', storeController.getStoresByRate);

// Lấy thông tin cửa hàng theo ID
homeRouter.get('/stores/:id', storeController.getStoreById);

homeRouter.get('/stores/search', storeController.getStores);

export default homeRouter;
