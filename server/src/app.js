import express from 'express';

import homeRouter from './routers/homeRouter.js';
const app = express();

//middleware
app.use(express.json());


app.use('/api', homeRouter);

export const viteNodeApp = app;