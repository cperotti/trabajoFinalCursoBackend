
import { cartService } from "../service/index.js"

class CartsController {

    createCart = async(req, res)=>{
        try {
            const newCart = {products: []}
            let response = await cartService.createCart(newCart)
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
            let response = await cartService.getCart(cid)
    
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
        
            let response = await cartService.addProductToCart(cid, pid)
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
            let dataUpdate = req.body
        
            let response = await cartService.updateProductToCart(cid, pid, dataUpdate)
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
            let response = await cartService.deleteAllProductsToCart(cid)
            res.send({
                status: 'success',
                payload:response
            })
        } catch (error) {
            console.log(error)
        }
        
    }

    finalizePurchase = async(req, res)=>{
        try {

            let {cid} = req.params;
            let dataUser = req.user
            let response = await cartService.finalizePurchase(cid, dataUser)

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