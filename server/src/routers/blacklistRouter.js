import express from 'express';
import blacklistController from '../controllers/blacklistController';
import userMiddleware from '../middlewares/userMiddleware';

const blacklistRouter = express.Router();

// Route thêm token vào blacklist

blacklistRouter.get('/all', userMiddleware, blacklistController.getBlacklistedStores);
blacklistRouter.delete('/remove/:storeId', userMiddleware, blacklistController.removeStoreFromBlacklist);

export default blacklistRouter;