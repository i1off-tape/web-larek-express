import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: path.join(__dirname, '../.env') });

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect(
  process.env.DB_ADDRESS || 'mongodb://127.0.0.1:27017/weblarek',
);

app.listen(PORT, () => {
  console.log('Ссылка на сервер:');
  console.log(`localhost:${PORT}`);
});
