import ProductManagerMongo from "../src/dao/mongo/product.mongo.js";
import Assert from 'assert';
import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/ecommerce')

const assert = Assert.strict

describe('Testing de Product Dao', ()=>{
    before(function(){
        this.productDao = new ProductManagerMongo();
    })
    beforeEach(function(){
        //mongoose.connection.collections.products.drop()
        this.timeout(2000)
    })
    it('El dao debe traer un producto correctamente de la base de datos', async function(){
        const result = await this.productDao.getProducts()
        console.log(result)
        //assert.strictEqual(Array.isArray(result.docs), true)
    })
    /*it('El dao debe crear un producto correctamente en la base de datos', async()=>{
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
    })*/
})