import { Request, Response, NextFunction } from 'express';
import { isCelebrateError } from 'celebrate';
import { CustomError } from '../errors/custom-errors';

export const errorHandler = (
  err: Error | CustomError,
  _req: Request, // 👈 добавляем _ перед неиспользуемыми параметрами
  res: Response,
  _next: NextFunction, // 👈 добавляем _ перед неиспользуемыми параметрами
) => {
  // 1. Наши кастомные ошибки (уже имеют правильный статус)
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  // Celebrate
  if (isCelebrateError(err)) {
    return res.status(400).json({ message: err.message });
  }

  // 3. Ошибка дубликата MongoDB
  if (err.message.includes('E11000') || err.message.includes('duplicate')) {
    return res.status(409).json({ message: 'Такой товар уже существует' });
  }

  // 4. Всё остальное - ошибка сервера
  console.error('Unhandled error:', err);
  return res.status(500).json({ message: 'На сервере произошла ошибка' });
};
