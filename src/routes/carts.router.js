import { Router } from "express";
//import CartsManager from '../dao/fileSystem/CartManager.js';
import CartManagerMongo from "../dao/mongo/cart.mongo.js";

const cartMongo = new CartManagerMongo()

const router = Router()

//const carts = new CartsManager('src/dao/fileSystem/dataCarts.json')

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
        let product = req.body;
    
        let response = await cartMongo.addProductToCart(cid, pid, product)
        res.send({
            status: 'success',
            payload: response,
        })
    } catch (error) {
        console.log(error)
    }
})


export default router;