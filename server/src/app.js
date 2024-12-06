import express from 'express';
import cors from 'cors';
import homeRouter from './routers/homeRouter.js';
import StoreDetailsRouter from './routers/StoreDetailsRouter.js';
const app = express();

//middleware
app.use(express.json());
app.use(cors());

app.use('/api', homeRouter);
app.use('/api/store-details', StoreDetailsRouter);

export const viteNodeApp = app;