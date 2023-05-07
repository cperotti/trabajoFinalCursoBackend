import express from 'express';
import {configServer} from './configServer/configServer.js';
import routerServer from './routes/index.js';
import __dirname from './dirname.js';
import handlebars from 'express-handlebars';

const app = express();

configServer.connectDB()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(`${__dirname}/public`))

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')


app.use(routerServer)

app.listen(8080, ()=> console.log('servidor arriba'));