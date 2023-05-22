import { Router } from "express";
import UserManagerMongo from "../dao/mongo/user.mongo.js";

const userMongo = new UserManagerMongo();

const router = Router();

// sesiones 
// router.get('/session', (req, res)=> {
//     if (req.session.counter) {
//         req.session.counter ++
//         res.send(`se ha visitado el sitio ${req.session.counter} veces.`)
//     } else {
//         req.session.counter = 1
//         res.send('Bienvenido')
//     }
// })

// router.get('/privada', auth,(req,res) => {

//     res.send('Todo lo que esta acá solo lo puede ver un admin loagueado')
// })
router.post('/login', async(req, res)=> {
    try {
        const {email,password} = req.body

        console.log(email,password)
    
        const userValidated = await userMongo.validateUser(email, password)

        if(!userValidated){
            res.send({
                status:'error',
                message:'No existe usuario con estas credenciales. Prueba ingresando nuevamente el email y la contraseña.'
            })
        }

        console.log(userValidated, req.session)

        req.session.user = {
            first_name: userValidated.first_name,
            last_name: userValidated.last_name,
            email: userValidated.email,
            role: userValidated.role,
        }

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

        console.log(alreadyExist)

        if(alreadyExist){
            res.send({
                status: 'error',
                message: 'Ya existe usuario con el email ingresado',
            })
        }else{

            await userMongo.addUser(newUser)

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
        res.send('logout ok')
    })
})

export default router;