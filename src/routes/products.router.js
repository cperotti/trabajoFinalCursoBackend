import { Router } from "express";
//import ProductManager from "../dao/fileSystem/ProductManager.js";
//import { uploader } from "../utils.js";
import { productModel } from "../dao/models/product.model.js";

//const products = new ProductManager('src/dao/fileSystem/dataProducts.json');

const router = Router();

/*router.get('/', (req, res)=>{
    products.getProducts().then((response)=>{
        let {limit} = req.query
        if(limit) return res.send({products: response.slice(0, limit)})
        res.send({products: response})
    })
    .catch((error)=>console.log(error))
})*/

router.get('/', async(req, res)=>{
    try{
        let products = await productModel.find();
        res.send({
            status: 'success',
            payload: products
        })
    }catch(error){
        console.log(error)
    }
})

router.get('/:pid', (req,res)=>{

    let {pid} = req.params
    
    products.getProductById(parseInt(pid)).then((response)=>{
        res.send(response)
    })
    .catch((error)=>console.log(error))
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

router.post('/', (req, res)=>{

    let product = req.body;

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