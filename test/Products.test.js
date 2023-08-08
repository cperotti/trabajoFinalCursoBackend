import ProductManagerMongo from "../src/dao/mongo/product.mongo.js";
import Assert from 'assert';
import { configServer } from "../src/configServer/configServer.js";
import mongoose from "mongoose";

configServer.connectDB()

const assert = Assert.strict

describe('Testing de Product Dao', ()=>{
    let productDao
    before(function(){
        const ProductDao = new ProductManagerMongo();
        productDao = ProductDao
    })
    beforeEach(function(){
        mongoose.connection.collections.products.drop()
        this.timeout(10000)
    })
    it('El dao debe traer un producto correctamente de la base de datos', async()=>{
        const result = await productDao.getProducts()
        assert.strictEqual(Array.isArray(result.docs), true)
    })
    it('El dao debe crear un producto correctamente en la base de datos', async()=>{
        let productMock = {
            title: 'Producto prueba',
            description: 'Es un producto de prueba',
            thumbnail: '', 
            price: 100,
            stock: 37,
            code: '015',
            category: 'prueba',
            status:true
        }
        const result = await productDao.addProduct(productMock)
        const product = await productDao.getProductById(result.id)
        console.log(product)
        assert.strictEqual(typeof product, 'object')
    })
})