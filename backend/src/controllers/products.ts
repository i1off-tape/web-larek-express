import { NextFunction, Request, Response } from 'express';
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

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      title, image, category, description, price,
    } = req.body;
    const product = await Product.create({
      title,
      image,
      category,
      description,
      price,
    });
    return res.status(201).send({ data: product });
  } catch (err) {
    return next(err);
  }
};
