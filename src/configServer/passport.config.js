import passport from 'passport'
import local from 'passport-local'
import UserManagerMongo from '../dao/mongo/user.mongo.js'
import { createHash, isValidPassword } from '../utils.js';

const userMongo  =  new UserManagerMongo();

const LocalStrategy = local.Strategy

export const initPassport = () => { 
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done)=>{
        const {firts_name, last_name} = req.body
        try {
            let user = await userMongo.validateUser({email: username})
            if (user) return done(null, false)

            let newUser = {
                firts_name,
                last_name,
                email: username,
                password: createHash(password)
            }

            let result = await userMongo.addUser(newUser)
            return done(null, result)
        } catch (error) {
            return done('Error al obtener el usuario'+error)
        }

    }))

    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done)=>{
        let user = await userMongo.validateUser({_id:id})
        done(null, user)
    })


    passport.use('login', new LocalStrategy({
        usernameField: 'email'
    }, async (username, password, done)=>{
        const user = await userMongo.validateUser({email: username})
        try {
            if(!user) return done(null, false)
    
            if(!isValidPassword(user, password)) return done(null, false)
            return done(null, user)
            
        } catch (error) {
            return done(error)
        }
    }))
}
