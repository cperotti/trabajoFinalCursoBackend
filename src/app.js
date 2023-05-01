import express from 'express';
import {configServer} from './configServer/configServer.js';
import routerServer from './routes/index.js';

const {pathname: root} = new URL('../src', import.meta.url)

const app = express();

configServer.connectDB()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(root +'public'))

app.use(routerServer)

app.listen(8080, ()=> console.log('servidor arriba'));