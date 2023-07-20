import express from "express";
import ProductManager from './components/ProductManager.js';
import { Server as HTTPServer } from "http";
import { Server as SocketIO } from "socket.io";
import engine from "express-handlebars";
import realTimeProductRouter from './router/realTimeProduct.routes.js'
import { __dirname } from "./dirname.js";
import path from "path";
import fs from 'fs';



const app = express();
const productsData = fs.readFileSync(path.resolve(__dirname, 'db/products.json'));
const products = JSON.parse(productsData);
const productos = new ProductManager();


app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname + "/views"));

app.use(express.json());
app.use("/", express.static(__dirname + "/public"));


app.get("/", async (req, res) => {
    let allProducts = await productos.getProducts()
    res.render("home", {
        products : products
    });
});

const httpServer = HTTPServer(app);


const io = new SocketIO(httpServer);

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use("/", realTimeProductRouter);


httpServer.listen(8080, () => {});