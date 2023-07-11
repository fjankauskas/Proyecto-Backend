import express from 'express';
import ProductManager from "./components/ProductManager.js";

const app = express();
app.use(express.urlencoded({ extended: true }));

const productos = new ProductManager();
const readProducts = async () => {
    return await productos.readProducts();
};

app.get("/products", async (req, res) => {
    let limit = parseInt(req.query.limit);
    if (!limit) return res.send(await readProducts()); 
    let allProduct = await readProducts(); 
    let productLimit = allProduct.slice(0, limit);
    res.send(productLimit);
});

app.get("/products/:id", async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let allProducts = await readProducts();
        let product = allProducts.find(product => product.id === id);

        if (!product) {
            res.status(404).send({ error: "Producto no encontrado" });
        } else {
            res.send(product);
        }
        } catch (error) {
            res.status(500).send({ error: "Error interno del servidor" });
        }
});

const port = 8080;
const server = app.listen(port, () => {
    console.log(`Express por local host ${server.address().port}`);
});

server.on('error', (error) => console.log(`error del servidor ${error}`));
