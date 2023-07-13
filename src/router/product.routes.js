import { Router } from "express";
import ProductManager from "../components/ProductManager.js";

const ProductRouter = Router()
const productos = new ProductManager();

ProductRouter.get('/', async (req, res ) =>{
    res.send(await productos.getProducts())
})

ProductRouter.get('/:id', async (req, res ) =>{
    let id = (req.params.id)
    res.send(await productos.getProductsById(id))
})

ProductRouter.post('/', async (req, res ) =>{
    let newProduct = req.body
    res.send(await productos.addProducts(newProduct))

})

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