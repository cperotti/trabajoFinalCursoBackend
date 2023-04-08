import { Router } from "express";
import ProductManager from "../ProductManager.js";

const products = new ProductManager('src/dataProducts.json');

const router = Router();

router.get('/', (req, res)=>{
    products.getProducts().then((response)=>{
        let {limit} = req.query
        if(limit) return res.send({products: response.slice(0, limit)})
        res.send({products: response})
    })
    .catch((error)=>console.log(error))
})

router.get('/:pid', (req,res)=>{

    let {pid} = req.params
    
    products.getProductById(parseInt(pid)).then((response)=>{
        res.send(response)
    })
    .catch((error)=>console.log(error))
})

router.post('/', (req, res)=>{

    let product = req.body

    products.addProduct(product).then((response)=>{
        res.send(response)
    })
    .catch((error)=>console.log(error))
})

router.put('/:pid', (req, res)=>{

    let product = req.body
    let {pid} = req.params

    products.updateProduct(parseInt(pid),product).then((response)=>{
        res.send(response)
    })
    .catch((error)=>console.log(error))
})

router.delete('/:pid', (req, res)=>{

    let {pid} = req.params

    products.deleteProduct(parseInt(pid)).then((response)=>{
        res.send(response)
    })
    .catch((error)=>console.log(error))
})

export default router;