import { Router } from 'express';

import MessageResponse from '../interfaces/MessageResponse';

import user from './routes/user.routes';
import product from './routes/product.routes';
import auth from './routes/auth.routes';
import admin from './routes/admin.routes';
import order from './routes/order.routes';

const router = Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

// TODO: Add basic rate limiter middleware for unauthenticated routes

router.use('/auth', auth);
router.use('/user', user);
router.use('/product', product);
router.use('/order', order);
router.use('/admin', admin);

export default router;
