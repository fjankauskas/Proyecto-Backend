import { Router } from "express";
import ProductManager from "../components/ProductManager.js";

const ProductRouter = Router()
const productos = new ProductManager();

ProductRouter.get('/', async (req, res ) =>{
    const limit = parseInt(req.query.limit);

    if (Number.isNaN(limit) || limit <= 0) {
        return res.status(404).send('El parámetro limit debe ser un número entero mayor que cero');
    }

    const limitedProducts = await productos.getProducts().slice(0, limit);

    res.send(limitedProducts);
})

ProductRouter.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const product = await productos.getProductsById(id);

        if (!product) {
        return res.status(404).send('No se encontró el recurso con el ID proporcionado');
        }

        res.send(product);

        } catch (error) {
        res.status(404).send('No se encontró el recurso con el ID proporcionado');
    }
});

ProductRouter.post('/', async (req, res) => {
    const newProduct = req.body;

    if (!newProduct.name || !newProduct.price || !newProduct.description) {
        return res.status(404).send('Los parámetros obligatorios (name, price, description) deben ser enviados');
    }


    try {
        const addedProduct = await productos.addProducts(newProduct);
        res.send(addedProduct);
    } catch (error) {
        res.status(404).send('Error al agregar el producto');
    }
});


ProductRouter.put('/:id', async (req, res) => {
    let id = req.params.id
    let updateProduct = req.body
    res.send(await productos.updateProduct({ id, product: updateProduct }))
})

ProductRouter.delete('/:id', async(req, res) =>{
    let id = req.params.id
    res.send(await productos.deleteProduct(id))
})

export default ProductRouter