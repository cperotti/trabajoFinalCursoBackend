import { productModel } from "../models/product.model.js";

class ProductManagerMongo {
    getProducts = async()=>{
        try{
            return await productModel.find({})
        }catch(error){
            return new Error(error)
        }
    }
    getProductById = async(pid)=>{
        try{
            return await productModel.findOne({_id: pid})
        }catch(error){
            return new Error(error)
        }
    }
    addProduct = async(newProduct)=>{
        try{
            return await productModel.create(newProduct)
        }catch(error){
            return new Error(error)
        }
    }
    updateProduct = async()=>{
        
    }
    deleteProduct = async()=>{
        
    }
}

export default ProductManagerMongo;