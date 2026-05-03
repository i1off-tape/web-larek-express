import { Request, Response } from 'express';
import crypto from 'crypto';
import Product from '../models/product';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { total, items } = req.body;
    const products = await Product.find({ _id: { $in: items } });

    if (products.length !== items.length) {
      return res.status(400).send({ message: 'Некоторые товары не найдены' });
    }

    if (products.some((p) => p.price === null)) {
      return res
        .status(400)
        .send({ message: 'Некоторые товары не имеют цены' });
    }

    const calculatedTotal = products.reduce(
      (sum, p) => sum + (p.price || 0),
      0,
    );

    if (calculatedTotal !== total) {
      return res.status(400).send({
        message: 'Некорректная сумма заказа',
        expected: calculatedTotal,
        received: total,
      });
    }

    return res.status(201).json({
      orderId: crypto.randomUUID(),
      total,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  }
};
