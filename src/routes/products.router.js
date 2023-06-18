import { Router } from "express";
import ProductsController from "../controllers/products.controllers.js";

const productsController = new ProductsController();

const router = Router();

router.get('/', productsController.getProducts)

router.get('/:pid', productsController.getProduct)

router.post('/', productsController.createProduct)

router.put('/:pid', productsController.updateProduct)

router.delete('/:pid', productsController.deleteProduct)

export default router;