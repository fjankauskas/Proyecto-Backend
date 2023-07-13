import {promises as fs} from 'fs'
import { nanoid } from 'nanoid'

class ProductManager {
    constructor () {
        this.path = './src/db/products.json' 
        this.productos = []
    };

    readProducts = async() => {
        let products = await fs.readFile(this.path, 'utf-8')
        return JSON.parse(products)
    };

    writeProducts = async (product) =>{
        await fs.writeFile(this.path, JSON.stringify(product))
    }

    exist = async (id) =>{
        let products = await this.readProducts()
        return products.find(prod => prod.id === id)
    }

    addProducts = async (product) =>{
        let productsOld = await this.readProducts()
        product.id = nanoid()
        let productAll = [...productsOld, product]
        await this.writeProducts(productAll)
        return "Producto Agregado"
    }

    getProducts = async() => {
        return await this.readProducts()
    };

    getProductsById = async(id) => {
        let productsById = await this.exist(id)
        if(!productsById) return 'Producto no encontrado'
        return productsById
    };

    updateProduct = async({id, product}) => {
        let productsById = await this.exist(id)
        if(!productsById) return 'Producto no encontrado'
        await this.deleteProduct(id)
        let productOld = await this.readProducts()
        let products = [{...product, id : id}, ...productOld]
        await this.writeProducts(products)
        return 'Producto actualizado'
    }

    deleteProduct = async(id) =>{
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


// productos.addProduct('Titulo1', 'Description1', 2000, 'img1', '3289328', 6)
// productos.addProduct('Titulo2', 'Description2', 1500, 'img2', '3289339', 4)
// productos.addProduct('Titulo3', 'Description2', 1350, 'img3', '3289339', 7)
// productos.addProduct('Titulo4', 'Description3', 1800, 'img4', '3289347', 5)
// productos.addProduct('Titulo5', 'Description3', 1300, 'img5', '3289347', 2)
// productos.addProduct('Titulo6', 'Description3', 2200, 'img6', '3289347', 3)
// productos.addProduct('Titulo7', 'Description3', 2800, 'img7', '3289347', 4)
// productos.addProduct('Titulo8', 'Description3', 1300, 'img8', '3289347', 8)
// productos.addProduct('Titulo9', 'Description3', 1450, 'img9', '3289347', 7)
// productos.addProduct('Titulo10', 'Description3', 1970, 'img10', '3289347', 2)


// productos.getProducts()

// productos.getProductsById(1)

// productos.deleteProduct(2)

// productos.updateProduct({
//     title: 'Titulo1',
//     description: 'Description1',
//     price: 4000,
//     img: 'img1',
//     code: '3289328',
//     stock: 6,
//     id: 1
// })

export default ProductManager