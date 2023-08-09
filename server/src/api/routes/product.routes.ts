import { Router } from 'express';
import TodoController from '../../controllers/product.controller';
import verifyJWT from '../../middleware/verifyJWT';
import tryCatch from '../../middleware/tryCatch';
import adminCheck from '../../middleware/adminCheck';
import AdminController from '../../controllers/admin.controller';

const router = Router();

// Use auth middleware for this router
router.use(verifyJWT);

router.get('/', tryCatch(TodoController.getAllProducts));

// TODO: consider moving this to adminRouter and using POST /admin/product
// This route should be and IS protected by admin middleware
router.post('/', adminCheck, tryCatch(AdminController.createProduct));

export default router;
