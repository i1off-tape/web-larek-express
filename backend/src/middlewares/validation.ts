import { Joi, celebrate, Segments } from 'celebrate';

export const validateOrder = celebrate({
  [Segments.BODY]: Joi.object({
    payment: Joi.string().valid('card', 'online').required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .pattern(/^\+7\d{10}$/)
      .required(),
    address: Joi.string().min(5).max(100).required(),
    total: Joi.number().min(0).required(),
    items: Joi.array()
      .items(Joi.string().hex().length(24).required())
      .min(1)
      .required(),
  }),
});

export const validateProduct = celebrate({
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(2).max(30).required()
      .messages({
        'string.min': 'Минимальная длина поля "title" - 2',
        'string.max': 'Максимальная длина поля "title" - 30',
        'any.required': 'Поле "title" должно быть заполнено',
        'string.empty': 'Поле "title" должно быть заполнено',
      }),
    image: Joi.object({
      fileName: Joi.string().required(),
      originalName: Joi.string().required().messages({
        'any.required': 'Изображение товара обязательно',
      }),
    }).required(),
    category: Joi.string().required(),
    description: Joi.string().optional(),
    price: Joi.number().min(0).optional().messages({
      'number.min': 'Цена товара не может быть отрицательной',
    }),
  }),
});
