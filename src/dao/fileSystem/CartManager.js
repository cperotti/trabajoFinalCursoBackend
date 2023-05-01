import fs from 'fs'

export default class CartsManager {
    constructor(path){
        this.path=path;
    }

    createFile = async() => {
        try{
            let cartsJson = JSON.stringify([], null, 2)
            await fs.promises.writeFile(this.path, cartsJson, 'utf-8')
            return 'Archivo creado con éxito'
        }
        catch (error){
            console.log(error)
        }
    }

    addCart = async() =>{
        try{
            const cartsParse = await this.getCarts();

            const idCart = cartsParse.length === 0 ? 1 : cartsParse[cartsParse.length-1].id +1
            cartsParse.push({id: idCart, products:[]})

            let cartsJson = JSON.stringify(cartsParse, null, 2)
            await fs.promises.writeFile(this.path, cartsJson, 'utf-8')

            return 'Carrito agregado exitosamente'
        }
        catch (error) {
            console.log(error);
        }
    }

    getCarts = async() =>{
        try{
            let dataFile =  await fs.promises.readFile( this.path, 'utf-8')
            const productsParse = await JSON.parse(dataFile);
            return productsParse
        }
        catch (error){
            console.log(error);
        }
    }

    getCartById = async(id) =>{
        try{
            const cartsParse = await this.getCarts()

            const cartSearch = cartsParse.find(cart => cart.id === id)
            if(cartSearch){
                return cartSearch.products
            }else{
                return "Not found"
            }
        }
        catch (error){
            console.log(error);
        }
    }

    addProductToCart = async(cartId, productId, dataProduct) =>{
        try{
            const cartsParse = await this.getCarts()

            //reveer como hacerlo
            const addProducts = cartsParse.map((cart)=>{
                if(cart.id === cartId){
                    if(cart.products.length === 0){
                        return{
                            ...cart,
                            products: [{product: productId, quantity: dataProduct.stock}]
                        }
                    }else{
                        const productSearch = cart.products.find(prod => prod.product === productId);

                        if(productSearch){
                            return{
                                ...cart,
                                products: cart.products.map((prod)=>{
                                    if(prod.product === productId){
                                        return{
                                            ...prod,
                                            quantity: prod.quantity + dataProduct.stock
                                        }
                                    }
                                    return prod
                                })
                            }
                        }else{
                            return{
                                ...cart,
                                products: [...cart.products, {product: productId, quantity:dataProduct.stock}]
                            }
                        }

                        
                    }
                }
                return cart
            })

            let productsJson = JSON.stringify(addProducts, null, 2)
            await fs.promises.writeFile(this.path, productsJson, 'utf-8')

            return 'Producto Agregado exitosamente'
    
        }
        catch (error) {
            console.log(error)
        }
    }

}