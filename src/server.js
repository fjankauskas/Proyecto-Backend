import express from 'express';
import ProductManager from './components/ProductManager.js';
import ProductRouter from './router/product.routes.js'
import CartRouter from './router/cart.routes.js'
import realTimeProductRouter from './router/realTimeProduct.routes.js'
import { engine } from "express-handlebars";
import { __dirname } from "./dirname.js";
import path from "path";
import fs from 'fs';

const productsData = fs.readFileSync(path.resolve(__dirname, 'db/products.json'));
const products = JSON.parse(productsData);
const productos = new ProductManager();


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/products', ProductRouter);
app.use('/api/cart', CartRouter);
app.use('/api/realTimeProduct', realTimeProductRouter);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname + "/views"));

app.use("/", express.static(__dirname + "/public"));


app.get("/", async (req, res) => {
    let allProducts = await productos.getProducts()
    res.render("home", {
        products : products
    });
});

const port = 8080;
const server = app.listen(port, () => {
    console.log(`Express por local host ${server.address().port}`);
});

server.on('error', (error) => console.log(`error del servidor ${error}`));
