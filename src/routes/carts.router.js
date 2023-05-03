import { Router } from "express";
import CartManagerMongo from "../dao/mongo/cart.mongo.js";

const cartMongo = new CartManagerMongo()

const router = Router()

router.post('/', async(req, res)=>{
    try {
        const newCart = {products: []}
        let response = await cartMongo.addCart(newCart)
        res.send({
            status: 'success',
            payload: response,
        })
    } catch (error) {
        console.log(error)
    }
})

router.get('/:cid', async(req, res)=>{
    try {
        let {cid} = req.params;
        let response = await cartMongo.getCartById(cid)
        res.send({
            status: 'success',
            payload:response
        })
    } catch (error) {
        console.log(error)
    }
    
})

router.post('/:cid/product/:pid', async(req, res)=>{
    try {
        let {cid, pid} = req.params;
        let dataProduct = req.body;
    
        let response = await cartMongo.addProductToCart(cid, pid, dataProduct)
        res.send({
            status: 'success',
            payload: response,
        })
    } catch (error) {
        console.log(error)
    }
})


export default router;