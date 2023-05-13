import { productModel } from "../models/product.model.js";

class ProductManagerMongo {
    getProducts = async(limit=10, sort)=>{
        try{
            return await productModel.find({}).sort(sort ? {price: sort}:{}).limit(limit)
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
    updateProduct = async(pid, dataReplace)=>{
        try {
            return await productModel.updateOne({_id: pid}, dataReplace)
        } catch (error) {
            return new Error(error)
        }
        
    }
    deleteProduct = async(pid)=>{
        try {
            return await productModel.deleteOne({_id: pid})
        } catch (error) {
            return new Error(error)
        }
    }
}

export default ProductManagerMongo;