import express from 'express';
import cors from 'cors';
import homeRouter from './routers/homeRouter.js';
const app = express();

//middleware
app.use(express.json());
app.use(cors());

app.use('/api', homeRouter);

export const viteNodeApp = app;