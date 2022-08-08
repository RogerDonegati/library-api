import dotenv from 'dotenv';

dotenv.config();

import express, { Application } from 'express';
import db from './db/database';
import customerRoutes from './routes/customerRoutes';
import homeRoutes from './routes/homeRoutes';
import productRoutes from './routes/productRoutes';
import rentalRoutes from './routes/rentalRoutes';
import saleRoutes from './routes/saleRoutes';

require('dotenv').config();

// init express
const app: Application = express();

// setup middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/', homeRoutes);
app.use('/product/', productRoutes);
app.use('/customer/', customerRoutes);
app.use('/rental/', rentalRoutes);
app.use('/sale/', saleRoutes);

// init database
db.sync();

// setup default app options
const host: string = process.env.SERVER_HOST!;
const port: number = +process.env.SERVER_PORT!;
app.set('port', port);
app.set('host', host);

export default app;
