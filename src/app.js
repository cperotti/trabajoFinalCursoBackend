import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import {configConnect} from './config/config.js';

const {pathname: root} = new URL('../src', import.meta.url)

const app = express();

configConnect.connectDB()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(root +'public'))

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(8080, ()=> console.log('servidor arriba'));