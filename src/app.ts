import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';

dotenv.config();
const app = express();
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    credentials: true,
  }),
);
mongoose.connect(process.env.MONGO_DB as string);

app.use(passport.initialize());
app.use(passport.session());

import googleRouter from './routesApp/googleRoutes';
import routes from './routesApp/routesGeneral';

app.use(routes);
app.use(googleRouter);

export default app;
