import { Router } from 'express';
import verifyJWT from '../../middleware/verifyJWT';
import tryCatch from '../../middleware/tryCatch';
import OrderController from '../../controllers/order.controller';
import approvedCheck from '../../middleware/approvedCheck';

const router = Router();

// Use auth middleware for this router
router.use(verifyJWT);

// GET - get all orders created by this user
router.get('/', tryCatch(OrderController.getOrders));

// POST - create new order guarded by approved check middleware
router.post('/', approvedCheck, tryCatch(OrderController.createOrder));

export default router;
