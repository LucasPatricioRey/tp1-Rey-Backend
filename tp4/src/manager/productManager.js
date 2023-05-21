import fs from "fs"
const createJsonFile = async () => {
  if (!fs.existsSync("src/db/products.json")) {
    return await fs.promises.writeFile("src/db/products.json", "[]");
  }
};

createJsonFile();

export class ProductManager {
  constructor() {
    this.path = "src/db/products.json";
    this.products = [];
    this.id = 0;
  }

  async addProduct(newProduct) {
    
    const productFile = await fs.promises.readFile(this.path, "utf-8");
    const products = JSON.parse(productFile);
    this.products = products;

    const findLastProduct = this.products.slice(-1).pop()
    this.id = findLastProduct.id + 1

    let title = newProduct.title;
    let description = newProduct.description;
    let price = newProduct.price;
    let thumbnail = newProduct.thumbnail;
    let code = newProduct.code;
    let stock = newProduct.stock;
    
    const codeError = this.products.find((prod) => prod.code == code);

    if (codeError || title == "" || description == "" || price == "" || code == "" || stock == "") {
      console.log("Error code, existing code");
    } else {
      const product = {
        id: this.id,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
      };
      this.products.push(product);
      const productsString = JSON.stringify(this.products);
      await fs.promises.writeFile(this.path, productsString);
    }
  }

  async getProducts() {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);
    return fileProductsParse
  }

  async getProductById(id) {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);
    const findProd = fileProductsParse.find((prod) => prod.id == id);

    if (findProd) {
      return console.log(findProd);
    } else {
      console.log("El producto no existe");
    }
  }

  async updateProduct(id, newProduct) {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);
    const findProd = fileProductsParse.find((prod) => prod.id == id);
    if (findProd) {
      let title = newProduct.title;
      let description = newProduct.description;
      let price = newProduct.price;
      let thumbnail = newProduct.thumbnail;
      let code = newProduct.code;
      let stock = newProduct.stock;

      const product = {
        id: id,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
      };

      this.products.push(product);
      const productsString = JSON.stringify(this.products);
      await fs.promises.writeFile(this.path, productsString);

      return true
    } else {
      return false
    }
  }

  async deleteProduct(id) {
    const fileProducts = await fs.promises.readFile(this.path, "utf-8");
    const fileProductsParse = JSON.parse(fileProducts);

    const positionProduct = fileProductsParse.findIndex(
      (prod) => prod.id == id
    );

    if (positionProduct == -1) {
      console.log("Product not found");
    } else {
      delete fileProductsParse[positionProduct];
      const productsDelete = fileProductsParse.filter(
        (prod) => prod !== undefined
      );

      const productsString = JSON.stringify(productsDelete);
      await fs.promises.writeFile(this.path, productsString);
    }
  }
}