import { cartModel } from "../models/cart.model.js"

class CartManagerMongo {
    addCart = async(newCart)=>{
        try {
            return await cartModel.create(newCart)
        } catch (error) {
            return new Error(error)
        }
    }
    getCarts = async()=>{
        try {
            return await cartModel.find()
        } catch (error) {
            return new Error(error)
        }
    }
    getCartById = async(cid)=>{
        try {
            return await cartModel.findOne({_id:cid})
        } catch (error) {
            return new Error(error)
        }
    }
    addProductToCart = async(cid, pid, newProduct)=>{
        try {
            return await cartModel.find({_id: cid}).updateOne({products: {_id: pid}}, {product: pid, quantity: newProduct.stock})
        } catch (error) {
            return new Error(error)
        }
    }
}

export default CartManagerMongo;