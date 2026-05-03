import { NextFunction, Request, Response } from 'express';
import { BadRequestError, ConflictError } from '../errors/custom-errors';
import Product from '../models/product';

export const getProducts = (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  Product.find({})
    .then((products) => res.send({ items: products, total: products.length }))
    .catch((err) => next(err));
};

export const createProduct = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {
    title, image, category, description, price,
  } = req.body;
  Product.create({
    title,
    image,
    category,
    description,
    price,
  })
    .then((product) => res.status(201).send({ data: product }))
    .catch((err) => {
      if (err instanceof Error && err.message.includes('E11000')) {
        return next(
          new ConflictError('Продукт с таким названием уже существует'),
        );
      }

      // Ошибка валидации Mongoose
      if (err?.name === 'ValidationError') {
        return next(
          new BadRequestError('Ошибка валидации данных при создании товара'),
        );
      }

      return next(err);
    });
};
