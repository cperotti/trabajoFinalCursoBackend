import { Router } from "express";

const router = Router();

router.get('/mockingproducts', (req,res)=>{
    let products = []
    for (let i = 0; i < 100; i++) {
        users.push(generateProducts())       
    }
    res.send({
        status: 'success',
        payload: products
    })

})

export default router;