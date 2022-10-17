import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import routes from './routes';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_DB as string);

app.use(routes);

export default app;
