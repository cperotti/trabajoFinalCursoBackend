import { messageService, productService, cartService, userService } from "../service/index.js";

class ViewsController {
    getMessages = async(req, res)=>{
        try{
            const messages = await messageService.getMessages()
            let data = {
                title: 'Mensajes',
                messages,
                hasMessages: messages.length > 0
            }
            res.render('chat', data)
        }catch (error){
            req.logger.error(error)
        }
    }

    createMessage = async(req, res)=>{
        try{
            const message= req.body;
            await messageService.createMessage(message)
    
            const messages = await messageService.getMessages()
            let data = {
                title: 'Mensajes',
                messages,
                hasMessages: messages.length > 0
            }
    
            res.render('chat', data)
         
        }catch (error){
            req.logger.error(error)
        }
    }

    getProductData = async(req,res)=>{
        try {
            let {limit, sort, status, category, query,page} = req.query
            const products = await productService.getProducts(limit, sort,status, category, query, page)
            const {docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages} = products;

            const cartId = await userService.getUserById(req.user.id)

            console.log(cartId)
    
            res.render('products',{
                status: 'success',
                payload: docs,
                userData:req.user,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
                totalPages,
                prevLink: hasPrevPage ? `/views/products?page=${prevPage}&limit=${limit?limit:10}${sort ?`&sort=${sort}`:''}${category ?`&category=${category}`:''}${status ?`&status=${status}`:''}`:null,
                nextLink: hasNextPage ? `/views/products?page=${nextPage}&limit=${limit?limit:10}${sort ?`&sort=${sort}`:''}${category ?`&category=${category}`:''}${status ?`&status=${status}`:''}`: null,
                linkCarrito:`/views/carts/${cartId}`
            })
            
        } catch (error) {
            req.logger.error(error)
        }
    }

    getCartData = async(req, res)=>{
        try {
            let {cid} = req.params;
            let response = await cartService.getCart(cid)
    
            res.render('cartId',{cart:response, hasCart: response.products.length >0})
        } catch (error) {
            req.logger.error(error)
        }
        
    }

    getLoginView = (req, res)=>{
        res.render('login', {})
    }

    getRegisterView = (req, res)=>{
        res.render('register', {})
    }

    getUsers = async(req, res)=>{
        let response = await userService.getUsers()
        //console.log(response)
        res.render('users',{usersList:response, hasUsers: response})
    }
}

export default ViewsController;