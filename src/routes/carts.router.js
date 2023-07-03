import { Router } from "express";
import CartsController from "../controllers/carts.controllers.js";
import { authorizaton } from "../middlewares/passportAuthorization.middleware.js";
import { passportAuth } from "../middlewares/passportAuth.middleware.js";

const cartsController = new CartsController();

const router = Router()

router.post('/', cartsController.createCart)

router.get('/:cid', cartsController.getCart)

router.post('/:cid/product/:pid', passportAuth('jwt'),authorizaton('user'), cartsController.addProductToCart)

router.delete('/:cid/product/:pid', cartsController.deleteProductToCart)

router.put('/:cid', cartsController.updateCart)

router.put('/:cid/product/:pid', cartsController.updateProductToCart)

router.delete('/:cid', cartsController.deleteAllProductsToCart)


export default router;