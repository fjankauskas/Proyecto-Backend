import {promises as fs} from 'fs'
import { nanoid } from 'nanoid'

class ProductManager {
    constructor () {
        this.path = './src/db/products.json' 
        this.productos = []
    };

    async readProducts() {
        let products = await fs.readFile(this.path, 'utf-8')
        return JSON.parse(products)
    };

    async writeProducts(product) {
        await fs.writeFile(this.path, JSON.stringify(product))
    }

    async exist(id) {
        let products = await this.readProducts()
        return products.find(prod => prod.id === id)
    }

    async addProducts(product) {
        let productsOld = await this.readProducts()
        product.id = nanoid()
        let productAll = [...productsOld, product]
        await this.writeProducts(productAll)
        return "Producto Agregado"
    }

    async getProducts() {
        return await this.readProducts()
    };

    async getProductsById(id) {
        let products = await this.exist(id);

        if (!products) {
            return null;
        }
        return products;
    };

    async updateProduct({id, product}) {
        let productsById = await this.exist(id)
        if(!productsById) return 'Producto no encontrado'
        await this.deleteProduct(id)
        let productOld = await this.readProducts()
        let products = [{...product, id : id}, ...productOld]
        await this.writeProducts(products)
        return 'Producto actualizado'
    }

    async deleteProduct(id){
        let products = await this.readProducts()
        let filter = products.some(prod => prod.id === id)
        if(filter){
            let filterProducts = products.filter(prod => prod.id != id)
            await this.writeProducts(filterProducts)
            return 'Producto Eliminado'
        }
        return 'Producto a eliminar no encontrado'
        
    };

}


export default ProductManager