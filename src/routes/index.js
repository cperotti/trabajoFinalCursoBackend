import { Router } from 'express';
import productsRouter from '../routes/products.router.js';
import cartsRouter from '../routes/carts.router.js';
import viewsRouter from '../routes/views.router.js';
import sessionRouter from '../routes/session.router.js'

const router = Router();

router.use('/api/products', productsRouter);
router.use('/api/carts', cartsRouter);
router.use('/views', viewsRouter);
router.use('/api/session', sessionRouter);

export default router;