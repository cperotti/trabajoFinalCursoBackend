import { Router } from "express";
import passport from "passport";

const router = Router();

router.post('/login', passport.authenticate('login', {successRedirect:'/views/products', failureRedirect:'/api/session/faillogin'}), async(req, res)=> {
    try {
        if (!req.user) return res.status(401).send({status: 'error', message: 'Datos incorrectos'})
        console.log('session',req.session, req.user)
        req.session.passport.user= {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            role: req.user.email === 'adminCoder@coder.com'? "admin":'user',
        }
        res.status(200).send({status: 'success', message: 'Usuario registrado', session: req.session.passport.user})

        /*const {email,password} = req.body
    
        const userValidated = await userMongo.validateUser(email, password)

        if(!userValidated){
            res.status(400).send({
                status:'error',
                message:'No existe usuario con estas credenciales. Prueba ingresando nuevamente el email y la contraseña.'
            })
        }
        if(!isValidPassword(userValidated,password)){
            return res.status(403).send({status: "error", error: "Contraseña incorrecta"})
        }

        delete userValidated.password

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
        })*/
        
    } catch (error) {
       console.log(error)
    }
})

router.get('/faillogin', async (req,res)=>{
    console.log('Falló la estrategia')
    res.send({status: 'error', error: 'falló autenticación'})
})


router.post('/register',passport.authenticate('register', {successRedirect:'/views/login', failureRedirect: '/api/session/failregister'}), async(req,res)=>{
    try {
        res.status(200).send({status: 'success', message: 'Usuario registrado'})
        /*const {first_name, last_name, email, date_of_birth, password} = req.body;

        const alreadyExist = await userMongo.existUserRegister(email)

        if(alreadyExist){
            res.send({
                status: 'error',
                message: 'Ya existe usuario con el email ingresado',
            })
        }else{

            let newUser = {
                first_name,
                last_name,
                email,
                date_of_birth,
                password: createHash(password)
            }

            await userMongo.addUser(newUser)

            res.redirect('/views/login')

            res.send({
                status: 'success',
                message: 'Se registró correctamente',
            })
        }*/
    
    } catch (error) {
        console.log(error)
    }
})

router.get('/failregister', async (req,res)=>{
    console.log('Falló la estrategia')
    res.send({status: 'error', error: 'falló autenticación'})
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