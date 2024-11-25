import express from 'express';

import storeController from '../controllers/storeController.js';
const homeRouter = express.Router();


homeRouter.get('/home', storeController.getTrendingStores);
homeRouter.get('/home/sort-rate', storeController.sortByRate);

export default homeRouter;