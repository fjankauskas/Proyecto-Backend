import {promises as fs} from 'fs'
import { nanoid } from 'nanoid'
import ProductManager from './ProductManager.js';

const productAll = new ProductManager

class CartManager{
    constructor(){
        this.path = './src/db/cart.json'
    }

    async readCarts () {
        let carts = await fs.readFile(this.path, 'utf-8')
        return JSON.parse(carts)
    };

    async writeCarts(carts) {
        await fs.writeFile(this.path, JSON.stringify(carts))
    }

    async exist(id) {
        let carts = await this.readCarts()
        return carts.find(cart => cart.id === id)
    }

    async addCarts() {
        let cartsOld = await this.readCarts()
        let id = nanoid()
        let cartsConcat = [{id : id, products : []}, ...cartsOld]
        await this.writeCarts(cartsConcat)
        return 'Carrito agregado'
    }

    async getCartById(id) {
        let cart = await this.exist(id);
        if (!cart) {
            return null;
        }
        return cart;
    };


    async addProductInCart(cartId, productId) {
        let cartById = await this.exist(cartId)
        if(!cartById) return 'Carrito no encontrado'
        let productsById = await productAll.exist(productId)
        if(!cartById) return 'Producto no encontrado'
        let cartsAll = await this.readCarts()
        let cartFilter = cartsAll.filter(cart => cart.id != cartId)

        if(cartById.products.some(prod => prod.id === productId)){
            let moreProductInCart = cartById.products.find(prod => prod.id === productId)
            moreProductInCart.cantidad++
            let cartsConcat = [cartById, ...cartFilter] 
            await this.writeCarts(cartsConcat)
            return 'Producto sumado al carrito'
        }
        cartById.products.push({id:productsById.id, cantidad: 1})
        let cartsConcat = [cartById, ...cartFilter] 
        await this.writeCarts(cartsConcat)
        return 'Producto agregado al carrito'
    }
}

export default CartManager