import express from 'express';

import menuController from '../controllers/menuController.js';
import storeController from '../controllers/storeController.js';
import featureController from '../controllers/featureController.js';
import blacklistController from '../controllers/blacklistController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const storeDetailsRouter = express.Router();

storeDetailsRouter.get('/:storeId', storeController.getStoresById);
storeDetailsRouter.get('/:storeId/menu', menuController.getMenuDetails);
storeDetailsRouter.get('/:storeId/feature', featureController.getFeaturesByStoreId);
storeDetailsRouter.post('/:storeId/blacklist', authMiddleware, blacklistController.addStoreToBlacklist);

export default storeDetailsRouter