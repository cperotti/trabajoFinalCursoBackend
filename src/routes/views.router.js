import {Router} from 'express';
import MessageManagerMongo from '../dao/mongo/message.mongo.js';
import ProductManagerMongo from "../dao/mongo/product.mongo.js";
import CartManagerMongo from '../dao/mongo/cart.mongo.js';
import { auth } from "../middlewares/autentication.moddleware.js";

const productsMongo = new ProductManagerMongo()

const cartMongo = new CartManagerMongo();

const messageMongo = new MessageManagerMongo();

const router = Router();

router.get('/messages', async(req, res)=>{
    try{
        const messages = await messageMongo.getMessages()
        let data = {
            title: 'Mensajes',
            messages,
            hasMessages: messages.length > 0
        }
        res.render('chat', data)
    }catch (error){
        console.log(error)
    }
})

router.post('/messages', async(req, res)=>{
    try{
        const message= req.body;
        await messageMongo.addMessage(message)

        const messages = await messageMongo.getMessages()
        let data = {
            title: 'Mensajes',
            messages,
            hasMessages: messages.length > 0
        }

        res.render('chat', data)
     
    }catch (error){
        console.log(error)
    }
})

router.get('/products', auth,async(req,res)=>{
    try {
        let {limit, sort, status, category, query,page} = req.query
        const products = await productsMongo.getProducts(limit, sort,status, category, query, page)
        const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages} = products;

        res.render('products',{
            status: 'success',
            userData:req.session.user,
            payload: docs,
            hasPrevPage,
            hasNextPage,
            prevPage,
            nextPage,
            totalPages,
            prevLink: hasPrevPage ? `/views/products?page=${prevPage}&limit=${limit?limit:10}${sort ?`&sort=${sort}`:''}${category ?`&category=${category}`:''}${status ?`&status=${status}`:''}`:null,
            nextLink: hasNextPage ? `/views/products?page=${nextPage}&limit=${limit?limit:10}${sort ?`&sort=${sort}`:''}${category ?`&category=${category}`:''}${status ?`&status=${status}`:''}`: null
        })
        
    } catch (error) {
        console.log(error)
    }
})

router.get('/carts/:cid', auth, async(req, res)=>{
    try {
        let {cid} = req.params;
        let response = await cartMongo.getCartById(cid)

        res.render('cartId',{cart:response, hasCart: response})
    } catch (error) {
        console.log(error)
    }
    
})

router.get('/login', (req, res)=>{
    res.render('login', {})
})

router.get('/register', (req, res)=>{
    res.render('register', {})
})


export default router;