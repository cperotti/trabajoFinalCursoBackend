import { Router } from "express";
import CartsManager from '../CartManager.js'

const router = Router()

const carts = new CartsManager('src/dataCarts.json')

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
    
})


export default router;