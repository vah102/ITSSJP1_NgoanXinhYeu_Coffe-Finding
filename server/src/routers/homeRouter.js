import express from 'express';

import storeController from '../controllers/storeController.js';
const homeRouter = express.Router();


homeRouter.get('/home', storeController.getTrendingStores);
homeRouter.get('/home/sort-rate', storeController.sortByRate);
homeRouter.get('/home/search', storeController.searchStores);
homeRouter.get('/home/filter', storeController.filterStores);
homeRouter.get('/home/search-filter', storeController.searchAndFilterStores);

export default homeRouter;