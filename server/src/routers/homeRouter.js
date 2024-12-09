import express from 'express';

import storeController from '../controllers/storeController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const homeRouter = express.Router();


homeRouter.get('/home', authMiddleware, storeController.getTrendingStores);
homeRouter.get('/home/sort-rate', authMiddleware, storeController.sortByRate);
homeRouter.get('/home/search', authMiddleware, storeController.searchStores);
homeRouter.get('/home/filter', authMiddleware, storeController.filterStores);
homeRouter.get('/home/search-filter', authMiddleware, storeController.searchAndFilterStores);

export default homeRouter;