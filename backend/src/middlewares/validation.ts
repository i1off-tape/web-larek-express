import { Joi, celebrate, Segments } from 'celebrate';

export const validateOrder = celebrate({
  [Segments.BODY]: Joi.object({
    payment: Joi.string().valid('card', 'online').required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .pattern(/^\+7\d{10}$/)
      .required(),
    address: Joi.string().min(5).max(100).required(),
    total: Joi.number().positive().required(),
    items: Joi.array().items(Joi.string()).min(1).required(),
  }),
});
