import passport from 'passport'
import local from 'passport-local'
import UserManagerMongo from '../dao/mongo/user.mongo.js'
import { createHash, isValidPassword } from '../utils.js';
import GithubStrategy from 'passport-github2'

const userMongo  =  new UserManagerMongo();

const LocalStrategy = local.Strategy

export const initPassport = () => { 
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done)=>{
        const {first_name, last_name} = req.body
        try {
            let user = await userMongo.validateUser({email: username})
            if (user) return done(null, false)

            let newUser = {
                first_name,
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

export const initPassportGitHub = () => {
    passport.use('github', new GithubStrategy({
        clientID:'Iv1.fa670e9d18217e2f',
        clientSecret:'c4a5a9d7a1f87ee37e5b4c8ac6a894fbea77946e',
        callbackURL:'http://localhost:8080/api/session/githubcallback'
    }, async(accessToken, refreshToken, profile, done)=>{
        try {
            let user = await userMongo.validateUser({email: profile._json.email})

            if(!user){
                let newUser = {
                    first_name: profile._json.name,
                    last_name: profile._json.name,
                    email: profile._json.email,
                    date_of_birth:'',
                    password:''
                }
                let result = await userMongo.addUser(newUser)
                return done(null, result)
            }

            return done(null,user)

        } catch (error) {
            console.log(error);
        }
    }))

    passport.serializeUser((user, done)=>{
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done)=>{
        let user = await userMongo.validateUser({_id:id})
        done(null, user)
    })

}
