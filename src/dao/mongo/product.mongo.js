import { productModel } from "./models/product.model.js";

class ProductManagerMongo {
    getProducts = async(limit=10, sort=null,status='', category='',query,page=1)=>{
        try{
            const aux = status === 'true' ? true : false 
            const aux2 = aux || category? {$or:[{category: {$eq: category}}, {status: {$eq: aux}}]}:{}
            const auxsort = sort ? {sort: {price:sort}}:{}
            return await productModel.paginate(aux2,{limit,page, ...auxsort, lean: true})
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