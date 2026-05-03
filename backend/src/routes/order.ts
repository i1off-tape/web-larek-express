import { Router } from 'express';
import { validateOrder } from '../middlewares/validation';
import { createOrder } from '../controllers/orders';

const router = Router();

router.post('/', validateOrder, createOrder);

export default router;
