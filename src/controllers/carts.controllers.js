
import { cartService } from "../service/index.js"

class CartsController {

    createCart = async(req, res)=>{
        try {
            const newCart = {products: []}
            let response = await cartService.addCart(newCart)
            res.send({
                status: 'success',
                payload: response,
            })
        } catch (error) {
            console.log(error)
        }
    }

    getCart = async(req, res)=>{
        try {
            let {cid} = req.params;
            let response = await cartService.getCartById(cid)
    
            res.send({
                status: 'success',
                payload:response
            })
        } catch (error) {
            console.log(error)
        }
        
    }

    addProductToCart = async(req, res)=>{
        try {
            let {cid, pid} = req.params;
            let dataProduct = req.body;
        
            let response = await cartService.addProductToCart(cid, pid, dataProduct)
            res.send({
                status: 'success',
                payload: response,
            })
        } catch (error) {
            console.log(error)
        }
    }

    deleteProductToCart = async(req, res)=>{
        try {
            let {cid, pid} = req.params;
        
            let response = await cartService.deleteProductToCart(cid, pid)
            res.send({
                status: 'success',
                payload: response,
            })
        } catch (error) {
            console.log(error)
        }
    }

    updateCart = async(req, res)=>{
        try {
            let {cid} = req.params;
            let dataCart = req.body
    
            let response = await cartService.updateCart(cid, dataCart)
            res.send({
                status: 'success',
                payload:response
            })
        } catch (error) {
            console.log(error)
        }
        
    }

    updateProductToCart = async(req, res)=>{
        try {
            let {cid, pid} = req.params;
            let dataProduct = req.body
        
            let response = await cartService.updateCartProduct(cid, pid, dataProduct)
            res.send({
                status: 'success',
                payload: response,
            })
        } catch (error) {
            console.log(error)
        }
    }

    deleteAllProductsToCart = async(req, res)=>{
        try {
            let {cid} = req.params;
            let response = await cartService.deleteAllProducts(cid)
            res.send({
                status: 'success',
                payload:response
            })
        } catch (error) {
            console.log(error)
        }
        
    }
}

export default CartsController;