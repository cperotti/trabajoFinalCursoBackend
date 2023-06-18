class SessionController {
    loginUser = async(req, res)=> {
        try {
            if (!req.user) return res.status(401).send({status: 'error', message: 'Datos incorrectos'})
    
                req.session.passport.user = {
                    _id:req.session.passport.user,
                    first_name: req.user.first_name,
                    last_name: req.user.last_name,
                    email: req.user.email,
                    role: req.user.role,
                }
    
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
            res.status(200).send({status: 'success', message: 'Usuario registrado'})
        
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
            res.redirect("/views/login")
        })
    }
}

export default SessionController;