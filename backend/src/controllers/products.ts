import { Request, Response } from 'express';

import Product from '../models/product';

export const getProducts = (_req: Request, res: Response) => {
  Product.find({})
    .then((products) => res.send({ items: products, total: products.length }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

export const createProduct = (req: Request, res: Response) => {
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
      if (err.code === 11000) {
        res
          .status(409)
          .send({ message: 'Продукт с таким названием уже существует' });
      } else {
        res.status(500).send({ message: 'На сервере произошла ошибка' });
      }
    });
};
