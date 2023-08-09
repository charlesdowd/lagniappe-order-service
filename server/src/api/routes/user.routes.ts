import { Router } from 'express';
import UserController from '../../controllers/user.controller';
import verifyJWT from '../../middleware/verifyJWT';
import tryCatch from '../../middleware/tryCatch';

const router = Router();

// TODO: Add this to all authenticated routes. It attaches user to the req
router.use(verifyJWT);

router.get('/', tryCatch(UserController.getUser));

router.post('/favorite', tryCatch(UserController.favoriteProduct));

router.post('/unfavorite', tryCatch(UserController.unfavoriteProduct));

export default router;
