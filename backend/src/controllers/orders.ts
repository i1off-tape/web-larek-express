import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';
import Product from '../models/product';
import { BadRequestError } from '../errors/custom-errors';

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { total, items } = req.body;
    const products = await Product.find({ _id: { $in: items } });

    if (products.length !== items.length) {
      return next(new BadRequestError('Некоторые товары не найдены'));
    }

    if (products.some((p) => p.price === null)) {
      return next(new BadRequestError('Некоторые товары не имеют цены'));
    }

    const calculatedTotal = products.reduce(
      (sum, p) => sum + (p.price || 0),
      0,
    );

    if (calculatedTotal !== total) {
      return next(new BadRequestError('Некорректная сумма заказа'));
    }

    return res.status(201).json({
      orderId: crypto.randomUUID(),
      total,
    });
  } catch (err) {
    return next(err);
  }
};
