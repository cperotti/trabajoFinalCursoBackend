import { Router } from "express";
//import CartsManager from '../dao/fileSystem/CartManager.js';
import { cartModel } from "../dao/models/cart.model.js";

const router = Router()

//const carts = new CartsManager('src/dao/fileSystem/dataCarts.json')

router.post('/', (req, res)=>{
    carts.addCart().then(response=>{
        res.send(response);
    })
    .catch((error)=> console.log(error));
})

router.post('/', (req, res)=>{
    carts.addCart().then(response=>{
        res.send(response);
    })
    .catch((error)=> console.log(error));
})

router.get('/:cid', (req, res)=>{
    let {cid} = req.params;
    carts.getCartById(parseInt(cid)).then((response)=>{
        res.send(response)
    })
    .catch((error)=> console.log(error))
    
})

router.post('/:cid/product/:pid', (req, res)=>{

    let {cid, pid} = req.params;
    let product = req.body;

    carts.addProductToCart(parseInt(cid), parseInt(pid), product).then(response=>{
        res.send(response)
    })
    .catch((error)=> console.log(error))
})


export default router;