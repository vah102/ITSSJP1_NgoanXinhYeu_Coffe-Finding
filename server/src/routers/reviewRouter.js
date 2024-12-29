import express from 'express';
import reviewController from '../controllers/reviewController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js';

const reviewRouter = express.Router();

reviewRouter.post('/create', authMiddleware, upload.single('image'), reviewController.createReview);
export default reviewRouter;