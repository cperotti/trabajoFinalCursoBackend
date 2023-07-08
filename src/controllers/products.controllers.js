
import { productService } from "../service/index.js";
//import { uploader } from "../utils.js";

class ProductsController {
    getProducts = async(req, res)=>{
        try{
            let {limit, sort, status, category, query,page} = req.query
            const products = await productService.getProducts(limit, sort,status, category, query, page)
            const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages} = products;
    
            res.send({
                status: 'success',
                payload: docs,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
                totalPages,
                prevLink: hasPrevPage ? `/api/products?page=${prevPage}&limit=${limit?limit:10}${sort ?`&sort=${sort}`:''}${category ?`&category=${category}`:''}${status ?`&status=${status}`:''}`:null,
                nextLink: hasNextPage ? `/api/products?page=${nextPage}&limit=${limit?limit:10}${sort ?`&sort=${sort}`:''}${category ?`&category=${category}`:''}${status ?`&status=${status}`:''}`: null
            })
    
        }catch(error){
            console.log(error)
        }
    }
    
    getProduct = async(req,res)=>{
        try{
            let {pid} = req.params
            
            let response = await productService.getProduct(pid)
            res.send({
                status:'success',
                payload: response,
            })
        }catch(error){
            console.log(error)
        }
    }
    
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
    createProduct = async(req, res)=>{
        try{
            const newProduct = req.body;
    
            let response = await productService.createProduct(newProduct)
                
            res.send({
                status:'Success',
                payload: response,
            })
    
        }catch(error){
            console.log(error)
        }
    }
    
    updateProduct = async(req, res)=>{
        try{
            let productReplace = req.body
            let {pid} = req.params
        
            let response = await productService.updateProduct(pid,productReplace)
            res.send({
                status: 'success',
                payload: response,
            })
        }catch (error){
            console.log(error)
        }
    }
    
    deleteProduct = async(req, res)=>{
        try {
            let {pid} = req.params
        
            let response = await productService.deleteProduct(pid)
            res.send({
                status:'success',
                payload: response,
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export default ProductsController;
