import CartDto from "../dto/cart.dto.js"

class CartRepository{
    constructor(dao){
        this.dao = dao
    }

    createCart = async(newCart)=>{
        let result = await this.dao.addCart(newCart);
        return result
    }

    getCart = async(cid)=>{
        let result = await this.dao.getCartById(cid);
        return result
    }

    addProductToCart = async(cid, pid, dataProduct)=>{
        let dataNewProductToCart =  new CartDto(dataProduct)
        let result = await this.dao.addProductToCart(cid,pid,dataNewProductToCart);
        return result
    }

    deleteProductToCart = async(cid, pid)=>{
        let result = await this.dao.deleteProductToCart(cid, pid);
        return result
    }

    updateCart = async(cid, dataCart)=>{
        let result = await this.dao.updateCart(cid, dataCart);
        return result
    }

    updateProductToCart = async(cid, pid, dataProduct)=>{
        let result = await this.dao.updateProductToCart(cid,pid.dataProduct);
        return result
    }

    deleteAllProductsToCart = async(cid)=>{
        let result = await this.dao.deleteAllProductsToCart(cid);
        return result
    }

    finalizePurchase = async(cid,data)=>{
        let result = await this.dao.finalizePurchase(cid, data);
        return result
    }
}

export default CartRepository;