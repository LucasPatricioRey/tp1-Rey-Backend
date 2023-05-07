const fs = require("fs");

class Product {
    static idCounter = 0
    constructor(title, description, price, thumbnail, code, stock) {
        this.id = ++Product.idCounter
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }
}
class ProductManager {
    #products
    #path

    constructor(path) {
        this.#products = []
        this.#path = path
        if (!fs.existsSync(this.#path)) return fs.writeFileSync(this.#path, "[]")
        try {
            const data = fs.readFileSync(this.#path, "utf-8");
            this.#products = JSON.parse(data);
        } catch (err) {
            if (err.code === "ENOENT") {
                fs.writeFileSync(this.#path, "[]");
            } else {
                throw err;
            }
        }
    }
    addProduct(title, description, price, thumbnail, code, stock) {

        this.#products = JSON.parse(fs.readFileSync(this.#path, "utf-8"))

        if (title == undefined || description == undefined || price == undefined || thumbnail == undefined || code == undefined || stock == undefined) return console.log("Todos los campos son obligatorios")
        if (this.#products.find(p => p.code === code)) return console.log("Ya existe un producto con este codigo")

        const newProduct = new Product(title, description, price, thumbnail, code, stock)
        this.#products.push(newProduct)
        fs.writeFileSync(this.#path, JSON.stringify(this.#products))

        return console.log("Producto Añadido")
    }
    getProducts() {
        
        return console.log(this.#products)
    }
    getProductById(pid) {
        
        if (this.#products.find(p => p.id === pid)) {
            const productFound = this.#products.find(p => p.id === pid)
            return console.log(productFound)
        }
        return console.log("No existe un producto con ese id")
    }
    deleteProduct(pid) {
        
        if (this.#products.find(p => p.id === pid)) {
            this.#products.splice(this.#products.indexOf(this.#products.find(p => p.id === pid)), 1)
            fs.writeFileSync(this.#path, JSON.stringify(this.#products))
            return console.log("Producto Eliminado")
        } else {
            return console.log("No se encontró un producto con el id indicado")
        }
    }
    updateProduct(pid, k, v) {
        
        if (k == "id") {
            return console.log("No puedes modificarle el id a un producto")
        } else if (this.#products.find(p => p.id === pid)) {
            const productFound = this.#products.find(p => p.id === pid)
            productFound[k] = v
            fs.writeFileSync(this.#path, JSON.stringify(this.#products))
            return console.log("Producto actualizado", productFound)
        } else {
            return console.log("No se encontró un producto con el id indicado")
        }
    }
}
const productManager = new ProductManager("./db/products.json")

// productManager.addProduct("Mancuerna", "Articulo de gimnasia", "2500", "/images/gimansio.png", "2", 5);
// productManager.addProduct("Colchoneta de gimnasia", "Articulo de gimnasia", "1500", "/images/gimansio.png", "2", 5);
// productManager.addProduct("Pesa rusa", "Articulo de gimnasia", "3500", "/images/gimansio.png", "4", 5);
// productManager.addProduct("Barra de gimnasio", "Articulo de gimnasia", "3000", "/images/gimansio.png", "5", 5);
// productManager.addProduct("Disco de pesa", "Articulo de gimnasia", "7620", "/images/gimansio.png", "6", 5);
// productManager.addProduct("Banco inclinable", "Articulo de gimnasia", "4000", "/images/gimansio.png", "7", 5);
// productManager.addProduct("Guantes deportivos", "Articulo de gimnasia", "700", "/images/gimansio.png", "8", 5);
// productManager.addProduct("Conjunto de ropa deportiva", "Articulo de gimnasia", "10000", "/images/gimansio.png", "9", 5);

// productManager.getProducts()

//productManager.getProductById(1)

//productManager.deleteProduct(1)

//productManager.updateProduct(2, "title", "Carrito 2.0")