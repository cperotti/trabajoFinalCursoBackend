import { Router } from "express";
//import { uploader } from "../utils.js";
import ProductManagerMongo from "../dao/mongo/product.mongo.js";

const productsMongo = new ProductManagerMongo()

const router = Router();

router.get('/', async(req, res)=>{
    try{
        let {limit, page, sort, query} = req.query
        const products = await productsMongo.getProducts(limit, sort)
        res.send({
            status: 'success',
            payload: products
        })
    }catch(error){
        console.log(error)
    }
})

router.get('/:pid', async(req,res)=>{
    try{
        let {pid} = req.params
        
        let response = await productsMongo.getProductById(pid)
        res.send({
            status:'success',
            payload: response,
        })
    }catch(error){
        console.log(error)
    }
})

//descomentar para ver error que me tira cuando pruebo cargarlo desde postman como form-data
//error => ENOENT: no such file or directory, open 'C:\C:\Users\Usuario\Downloads\CARO\cursoBackendCoder\trabajofinal\src\public\uploads\6a30b2fece22d38d8d219d3dbdfc846d.jpg'

// router.post('/', uploader.array('thumbnail'), (req, res)=>{
//     let product = req.body
//     let files = req.files

//     console.log(files, product)

//     products.addProduct(product).then((response)=>{
//         res.send(response)
//     })
//     .catch((error)=>console.log(error))
// })

router.post('/', async(req, res)=>{
    try{
        const newProduct = req.body;

        let response = await productsMongo.addProduct(newProduct)
            
        res.send({
            status:'Success',
            payload: response,
        })

    }catch(error){
        console.log(error)
    }
})

router.put('/:pid', async(req, res)=>{
    try{
        let productReplace = req.body
        let {pid} = req.params
    
        let response = await productsMongo.updateProduct(pid,productReplace)
        res.send({
            status: 'success',
            payload: response,
        })
    }catch (error){
        console.log(error)
    }
})

router.delete('/:pid', async(req, res)=>{
    try {
        let {pid} = req.params
    
        let response = await productsMongo.deleteProduct(pid)
        res.send({
            status:'success',
            payload: response,
        })
    } catch (error) {
        console.log(error)
    }
})

export default router;