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

       res.render('cartId',{cart:response, hasCart: response})
        /*res.send({
            status: 'success',
            payload:response
        })*/
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

router.delete('/:cid/product/:pid', async(req, res)=>{
    try {
        let {cid, pid} = req.params;
    
        let response = await cartMongo.deleteProductToCart(cid, pid)
        res.send({
            status: 'success',
            payload: response,
        })
    } catch (error) {
        console.log(error)
    }
})

router.put('/:cid', async(req, res)=>{
    try {
        let {cid} = req.params;
        let dataCart = req.body

        let response = await cartMongo.updateCart(cid, dataCart)
        res.send({
            status: 'success',
            payload:response
        })
    } catch (error) {
        console.log(error)
    }
    
})

router.put('/:cid/product/:pid', async(req, res)=>{
    try {
        let {cid, pid} = req.params;
        let dataProduct = req.body
    
        let response = await cartMongo.updateCartProduct(cid, pid, dataProduct)
        res.send({
            status: 'success',
            payload: response,
        })
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:cid', async(req, res)=>{
    try {
        let {cid} = req.params;
        let response = await cartMongo.deleteAllProducts(cid)
        res.send({
            status: 'success',
            payload:response
        })
    } catch (error) {
        console.log(error)
    }
    
})


export default router;