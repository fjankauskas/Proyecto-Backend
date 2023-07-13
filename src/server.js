import express from 'express';
import ProductRouter from './router/product.routes.js'
import CartRouter from './router/cart.routes.js'


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('/api/products', ProductRouter)

app.use('/api/cart', CartRouter)




const port = 8080;
const server = app.listen(port, () => {
    console.log(`Express por local host ${server.address().port}`);
});

server.on('error', (error) => console.log(`error del servidor ${error}`));
