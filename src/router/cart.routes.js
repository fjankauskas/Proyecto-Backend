import { Router } from "express";
import CartManager from "../components/CartManager.js";

const CartRouter = Router()
const carts = new CartManager

CartRouter.post('/', async (req, res) =>{
    res.send(await carts.addCarts())
})

CartRouter.get('/', async (req, res) =>{
    res.send(await carts.readCarts())
})

CartRouter.get('/:id', async (req, res) => {
    const cartId = req.params.id;

    try {
        const cart = await carts.getCartById(cartId);

        if (!cart) {
            return res.status(404).send('No se encontró el carrito con el ID proporcionado');
        }

        res.send(cart);
        } catch (error) {
        res.status(404).send('No se encontró el carrito con el ID proporcionado');
    }
});


CartRouter.post('/:cid/products/:pid', async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    try {
        const cart = await carts.getCartById(cartId);
    
        if (!cart) {
            return res.status(404).send('No se encontró el carrito con el ID proporcionado');
        }
    
        const product = await products.getProductById(productId);
    
        if (!product) {
            return res.status(404).send('No se encontró el producto con el ID proporcionado');
        }

        res.send('Producto agregado al carrito exitosamente');
        } catch (error) {
            res.status(404).send('Error al agregar el producto al carrito');
    }
});



export default CartRouter