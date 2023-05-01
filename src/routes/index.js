import { Router } from 'express';
import productsRouter from '../routes/products.router.js';
import cartsRouter from '../routes/carts.router.js';

const router = Router();

router.use('/api/products', productsRouter);
router.use('/api/carts', cartsRouter);

export default router;