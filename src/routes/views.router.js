import {Router} from 'express';
import { passportAuth } from '../middlewares/passportAuth.middleware.js';
import { authorizaton } from '../middlewares/passportAuthorization.middleware.js'
import ViewsController from '../controllers/views.controllers.js';

const viewsController = new ViewsController();

const router = Router();

router.get('/messages', viewsController.getMessages)

router.post('/messages', passportAuth('jwt'), authorizaton('user'), viewsController.createMessage)

router.get('/products', passportAuth('jwt'),viewsController.getProductData)

router.get('/carts/:cid', passportAuth('jwt'), viewsController.getCartData)

router.get('/login', viewsController.getLoginView)

router.get('/register', viewsController.getRegisterView)


export default router;