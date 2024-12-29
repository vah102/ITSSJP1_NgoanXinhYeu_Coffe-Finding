import express from 'express';
import blacklistController from '../controllers/blacklistController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const blacklistRouter = express.Router();

// Route lấy danh sách quán trong blacklist của user
blacklistRouter.get('/all', authMiddleware, blacklistController.getUserBlacklist);

blacklistRouter.post('/add', authMiddleware, blacklistController.addStoreToBlacklist);
blacklistRouter.delete('/remove', authMiddleware, blacklistController.removeStoreFromBlacklist);
export default blacklistRouter;
