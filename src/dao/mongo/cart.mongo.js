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
    addProductToCart = async(cid, pid, dataProduct)=>{
        try {
            const findCart = await cartModel.find({_id: cid})
            const hasProduct = findCart[0].products.find(el => el.product === pid)
            if(findCart.length > 0){
                if(hasProduct){
                    return await cartModel.updateOne({_id: cid, "products.product": pid}, {$inc: {"products.$.quantity": dataProduct.stock}})
                }else{
                    return await cartModel.updateOne({_id: cid}, {$push:{products:{product: pid, quantity: dataProduct.stock}}})
                }
            }else{
                return 'No hay carritos creados'
            }
        } catch (error) {
            return new Error(error)
        }
    }
}

export default CartManagerMongo;