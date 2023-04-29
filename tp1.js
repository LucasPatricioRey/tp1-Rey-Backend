class ProductManager{
    #products
    static idCounter
    constructor(title, description, price, thumbnail, code, stock){
        this.#products =[]
        this.idCounter = 0
        this.id -  ++ this.idCounter
        this.tittle =title
        this.description =description
        this.price =price
        this.thumbnail =thumbnail
        this.code =code
        this.stock =stock

    }

addProduct(tittle, description, price, thumbnail, code, stock ){
    let product = {
        tittle,
        description,
        price,
        code,
        thumbnail,
        stock,
        id: this.#getId(),
    };
    this.#products.push(newProduct)
    return console.log("produto añadido")    

}getProducts(){
    return console.log(this.#products)
}
getProductById(){
    
}

}