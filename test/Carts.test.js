import mongoose from 'mongoose'
import CartManagerMongo from '../src/dao/mongo/cart.mongo.js';
import chai from 'chai';
import { configLocalServer } from '../src/configServer/configLocalServer.js';

configLocalServer.connectDB()
const expect = chai.expect

describe('Testing de Cart Dao', ()=> {
    before(function () {
        this.cartDao = new CartManagerMongo();
    })
    beforeEach(function(){
        // mongoose.connection.collections.users.drop()
        this.timeout(2000)
    })
    it('El dao debe poder obtener todos los carts en un arreglo', async function(){
        const result = await this.cartDao.getCarts({})
        console.log(result)
        expect(result).to.be.deep.equal([])
        expect(result).deep.equal([])
        expect(Array.isArray(result)).to.be.ok
        expect(Array.isArray(result)).to.be.equals(true)
    }).timeout(20000)
})
