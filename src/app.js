import express from 'express';
import {configServer} from './configServer/configServer.js';
import routerServer from './routes/index.js';
import __dirname from "./utils.js";
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import FileStore from 'session-file-store'
import session from 'express-session';
import pkg from 'connect-mongo';
import { initPassport,initializePassport, initPassportGitHub } from './configServer/passport.config.js';
import passport from 'passport';
import dotEnv from 'dotenv';
import { errorHandler } from './middlewares/error.middleware.js';
import { addLoggerDev, addLoggerProd } from './configServer/logger.js';
dotEnv.config()

const {create} = pkg;

const app = express();

configServer.connectDB()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(`${__dirname}/public`))

app.use(cookieParser('P@l@braS3cr3t0'))

app.use(addLoggerDev)

const fileStore = FileStore(session);

app.use(session({
    store: create({
        mongoUrl: process.env.MONGO_URL_SERVER,
        mongoOptions:{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        ttl:1000000*6000,
    }),
    secret: 'secretCoder',
    resave:false,
    saveUninitialized: false
}))

// initPassport()
initializePassport()
initPassportGitHub()
passport.use(passport.initialize())
passport.use(passport.session())


app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use(routerServer)

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, ()=> console.log('servidor arriba'));