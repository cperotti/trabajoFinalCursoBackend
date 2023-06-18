import { Router } from "express";
import passport from "passport";
import SessionController from "../controllers/session.controller.js";
import { passportAuth } from "../middlewares/passportAuth.middleware.js";
import { authorizaton } from "../middlewares/passportAuthorization.middleware.js";

const sessionController = new SessionController()

const router = Router();

router.post('/login', /*passport.authenticate('login', {failureRedirect:'/api/session/faillogin'})*/ sessionController.loginUser)

router.get('/faillogin', sessionController.failLogin)

router.post('/register', passportAuth('jwt'), authorizaton('user')/*passport.authenticate('register', {successRedirect:'/views/login', failureRedirect: '/api/session/failregister'})*/, sessionController.registerUser)

router.get('/failregister', sessionController.failRegister)

router.get('/github', passport.authenticate('github', {scope: ['user:email']}),()=>{})

router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/views/login'}),sessionController.githubCallback)

router.get('/logout', sessionController.logoutUser)

router.get('/current', 
        passportAuth('jwt'), 
        authorizaton('admin'),
        (req, res)=> {
            res.send('current')
        })


export default router;