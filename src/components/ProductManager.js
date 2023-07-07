import {promises as fs} from 'fs'

class ProductManager {
    constructor () {
        this.path = './productos.txt' 
        this.productos = []
    };

    static id = 0

    addProduct = async (title, description, price, img, code, stock) => {
        ProductManager.id++
        let newProduct = {
            title,
            description,
            price,
            img,
            code,
            stock,
            id: ProductManager.id
        }
        this.productos.push(newProduct)

        await fs.writeFile(this.path, JSON.stringify(this.productos))
    };

    readProducts = async() => {
        let respuesta = await fs.readFile(this.path, 'utf-8')
        return JSON.parse(respuesta)
    };

    getProducts = async() => {
        let espera = await this.readProducts()
        return console.log(espera) 
    };

    getProductsById = async(id) => {
        let espera2 = await this.readProducts()
        if(!espera2.find(productos => productos.id === id)){
            console.log('Producto no encontrado')
        } else {
            console.log(espera2.find(productos => productos.id === id))
        }
    };

    deleteProduct = async(id) =>{
        let espera3 = await this.readProducts()
        let filter = espera3.filter(productos => productos.id != id)
        await fs.writeFile(this.path, JSON.stringify(filter))
        console.log('Producto eliminado')
    };

    updateProduct = async({id, ...productos}) => {
        await this.deleteProduct(id)
        let productOld = await this.readProducts()
        let productUpdated = [
            {...productos, id},
            ...productOld
        ]
        await fs.writeFile(this.path, JSON.stringify(productUpdated))
    };
}

const productos = new ProductManager

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