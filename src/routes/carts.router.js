import { Router } from "express";
import CartsController from "../controllers/carts.controllers.js";

const cartsController = new CartsController();

const router = Router()

router.post('/', cartsController.createCart)

router.get('/:cid', cartsController.getCart)

router.post('/:cid/product/:pid', cartsController.addProductToCart)

router.delete('/:cid/product/:pid', cartsController.deleteProductToCart)

router.put('/:cid', cartsController.updateCart)

router.put('/:cid/product/:pid', cartsController.updateProductToCart)

router.delete('/:cid', cartsController.deleteAllProductsToCart)


export default router;