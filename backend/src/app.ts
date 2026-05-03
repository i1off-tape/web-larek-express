import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRouter from './routes/product';
import orderRouter from './routes/order';
import { errors } from 'celebrate';
import { notFoundHandler } from './middlewares/not-found';
import { errorHandler } from './middlewares/error-handler';

dotenv.config({ path: path.join(__dirname, '../.env') });

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  process.env.DB_ADDRESS || 'mongodb://127.0.0.1:27017/weblarek',
);

app.use('/product', productRouter);
app.use('/order', orderRouter);

app.use(express.static(path.join(__dirname, './public')));

app.use(errors());
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Ссылка на сервер:');
  console.log(`localhost:${PORT}`);
});
