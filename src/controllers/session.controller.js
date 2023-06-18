import { generateToken } from "../utils/generateTokenJwt.js"
import { userService } from "../service/user.service.js"
import { createHash } from "../utils.js"

class SessionController {
    loginUser = async(req, res)=> {
        try {
            const user = await userService.validateUser({email: req.body.email})

            const dataUser={
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role
            }
    
            const token = generateToken(dataUser)
        
            res.cookie('cookieUser', token, {
                maxAge: 60*60*10000,
                httpOnly: true
            })

            res.redirect('/views/products')
            
        } catch (error) {
           console.log(error)
        }
    }

    failLogin = async (req,res)=>{
        res.send({status: 'error', error: 'falló autenticación'})
    }

    registerUser = async(req,res)=>{
        try {
            let user = await userService.validateUser({email: req.body.email})
            if (user) return res.send({status:'error', error:'Ya existe usuario registrado con etos datos'})

            let newUser = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                date_of_birth: req.body.date_of_birth,
                role:req.body.role,
                password: createHash(req.body.password)
            }

            await userService.addUser(newUser)

            res.redirect('/views/login')
        
        } catch (error) {
            console.log(error)
        }
    }

    failRegister = async (req,res)=>{
        res.send({status: 'error', error: 'falló autenticación'})
    }

    githubCallback = (req,res)=> {
        req.session.passport.user = {
            _id:req.session.passport.user,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            role: req.user.email === 'adminCoder@coder.com'? "admin":'user',
        }
        res.redirect('/views/products')
    }

    logoutUser = (req, res)=>{
        req.session.destroy(err=>{
            if (err) {
                return res.send({status: 'error', error: err})
            }
            res.clearCookie('cookieUser')
            res.redirect("/views/login")
        })
    }
}

export default SessionController;