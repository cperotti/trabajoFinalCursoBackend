import express from 'express';
import {configServer} from './configServer/configServer.js';
import routerServer from './routes/index.js';
import __dirname from './dirname.js';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import FileStore from 'session-file-store'
import session from 'express-session';
import pkg from 'connect-mongo';

const {create} = pkg;

const app = express();

configServer.connectDB()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(`${__dirname}/public`))

app.use(cookieParser('P@l@braS3cr3t0'))

const fileStore = FileStore(session);

app.use(session({
    store: create({
        mongoUrl:'mongodb+srv://cperotti:cpm.db@cluster0.gqgbmdf.mongodb.net/ecommerce?retryWrites=true&w=majority',
        collectionName:'sessions',
        mongoOptions:{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        ttl:1000000*60,
    }),
    secret: 'secretCoder',
    resave:false,
    saveUninitialized: false
}))

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')


app.use(routerServer)

app.listen(8080, ()=> console.log('servidor arriba'));