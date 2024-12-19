import express from 'express';
import reviewController from '../controllers/reviewController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const reviewRouter = express.Router();

reviewRouter.post('/create', authMiddleware, reviewController.createReview);
export default reviewRouter;