import { Router } from "express";
import UserManagerMongo from "../dao/mongo/user.mongo.js";

const userMongo = new UserManagerMongo();

const router = Router();

router.post('/login', async(req, res)=> {
    try {
        const {email,password} = req.body
    
        const userValidated = await userMongo.validateUser(email, password)

        if(!userValidated){
            res.send({
                status:'error',
                message:'No existe usuario con estas credenciales. Prueba ingresando nuevamente el email y la contraseña.'
            })
        }

        req.session.user = {
            first_name: userValidated.first_name,
            last_name: userValidated.last_name,
            email: userValidated.email,
            role: userValidated.email === 'adminCoder@coder.com'? "admin":'user',
        }
        res.redirect('/views/products')

        res.send({
            status: 'success',
            message: 'Se inició sesión correctamente',
            session: req.session.user
        })
        
    } catch (error) {
        console.log(error)
    }
})

router.post('/register', async(req,res)=>{
    try {
        const newUser = req.body;

        const alreadyExist = await userMongo.existUserRegister(newUser.email)

        if(alreadyExist){
            res.send({
                status: 'error',
                message: 'Ya existe usuario con el email ingresado',
            })
        }else{

            await userMongo.addUser(newUser)

            res.redirect('/views/login')

            res.send({
                status: 'success',
                message: 'Se registró correctamente',
            })
        }
    
    } catch (error) {
        console.log(error)
    }
})


router.get('/logout', (req, res)=>{
    req.session.destroy(err=>{
        if (err) {
            return res.send({status: 'error', error: err})
        }
        res.redirect("/views/login")
    })
})

export default router;