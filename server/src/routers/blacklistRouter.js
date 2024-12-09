import express from 'express';
import blacklistController from '../controllers/blacklistController';
import authMiddleware from '../middlewares/authMiddleware';

const blacklistRouter = express.Router();

// Route thêm token vào blacklist

blacklistRouter.get('/all', authMiddleware, blacklistController.getBlacklistedStores);
blacklistRouter.delete('/remove/:storeId', authMiddleware, blacklistController.removeStoreFromBlacklist);

export default blacklistRouter;