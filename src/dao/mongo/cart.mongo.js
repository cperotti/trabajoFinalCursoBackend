import { cartModel } from "./models/cart.model.js"
import { productModel } from "./models/product.model.js"
import { ticketModel } from "./models/ticket.model.js"
import { userModel } from "./models/user.model.js"

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
            return await cartModel.findOne({_id:cid}).lean()
        } catch (error) {
            return new Error(error)
        }
    }
    addProductToCart = async(cid, pid, dataProduct)=>{
        try {
            const findCart = await cartModel.find({_id: cid})
            const hasProduct = findCart[0].products.find(el => el.product.toString() === pid)
            if(findCart.length > 0){
                if(hasProduct){
                    return await cartModel.updateOne({_id: cid, "products.product": pid}, {$inc: {"products.$.quantity": dataProduct.stock}})
                }else{
                    return await cartModel.updateOne({_id: cid}, {$push:{products:{product: pid, quantity: dataProduct.stock}}})
                }
            }else{
                return 'No exite un carrito con ese id'
            }
        } catch (error) {
            return new Error(error)
        }
    }

    deleteProductToCart = async(cid, pid)=>{
        try {
            const findCart = await cartModel.find({_id: cid})
            const hasProduct = findCart[0].products.find(el => el.product.toString() === pid)
            if(findCart.length > 0){
                if(hasProduct){
                    return await cartModel.updateOne({_id: cid}, {$pull: {products: {product: pid}}})
                }else{
                    return 'no encontramos un producto con ese id en el carrito'
                }
            }else{
                return 'No exite un carrito con ese id'
            }
        } catch (error) {
            return new Error(error)
        }
    }

    updateCart = async(cid, dataCart)=>{
        try {
            const findCart = await cartModel.find({_id: cid})
            if(findCart.length > 0){
                return await cartModel.updateOne({_id: cid}, {$set:{products:dataCart}})
            }else{
                return 'No exite un carrito con ese id'
            }
            
        } catch (error) {
            return new Error(error)
        }
    }

    updateCartProduct = async(cid, pid, dataProduct)=>{
        try {
            const findCart = await cartModel.find({_id: cid})
            const hasProduct = findCart[0].products.find(el => el.product.toString() === pid)
            if(findCart.length > 0){
                if(hasProduct){
                    return await cartModel.updateOne({_id: cid, "products.product": pid}, {$set: {"products.$.quantity": dataProduct.stock}})
                }else{
                    return 'no encontramos un producto con ese id en el carrito'
                }
            }else{
                return 'No exite un carrito con ese id'
            }
            
        } catch (error) {
            return new Error(error)
        }
    }

    deleteAllProducts = async(cid)=>{
        try {
            const findCart = await cartModel.find({_id: cid})
            if(findCart.length > 0){
                return await cartModel.updateOne({_id: cid}, {$set:{products:[]}})
            }else{
                return 'No exite un carrito con ese id'
            }
            
        } catch (error) {
            return new Error(error)
        }
    }

    finalizePurchase = async(cid, dataUser)=>{
        try {
            const cartById = await cartModel.findOne({_id: cid}).lean()
            const noComprado = []
            const comprado = []

            cartById.products.map(dataCart=>{
                const product = dataCart.product
                const quantity = dataCart.quantity
                const stock = dataCart.product.stock

                if(quantity <= stock){
                    comprado.push(product.id)
                    dataCart.product.stock -= quantity
                    const productBD = productModel.updateOne({_id: product.id}, dataCart.product)
                }else{
                    noComprado.push(product.id)
                }
            })

            const ticket = await ticketModel.create({
                code: 'agregar code',
                amount: 0,
                purchaser: dataUser.id
            })

        } catch (error) {
            return new Error(error)
        }
    }
}

export default CartManagerMongo;