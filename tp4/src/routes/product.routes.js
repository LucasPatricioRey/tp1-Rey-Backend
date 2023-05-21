import express from "express";
import { ProductManager } from "../manager/productManager.js";
const productManager = new ProductManager();
export const productsRoute = express.Router();

productsRoute.get("/", async (req, res) => {
    const allProducts = await productManager.getProducts();

    let limit = req.query.limit;
    if (!limit) {
        return res.json({
        products: allProducts
        });
    }else if (limit > 0 && limit <= allProducts.length) {
        let productsLimit = allProducts.slice(0, limit);
        return res.json({ data: productsLimit });
    }else if (limit > allProducts.length) {
        return res.json({
        status: "error",
        msg: "Excede el limite de productos",
        });
    }

    return res.status(200).json({ 
      status: "exito", 
      msg: "Todos los productos",
      data: allProducts
    });
});
  
productsRoute.get("/:pid", async (req, res) => {
    const allProducts = await productManager.getProducts();
    let productId = req.params.pid;
    let productFound = allProducts.find((product) => product.id === productId);
    if (!productFound) {
        return res.status(404).json({ status: "Error", data: "ID de producto no encontrado" });
    }
    res.status(200).json({ status: "exito", data: productFound });
});

productsRoute.delete("/:id", (req, res) => {
    const id = req.params.id;
    productManager.deleteProduct(id)
});

productsRoute.post("/", async (req, res) => {
    const productToCreate = req.body;
    await productManager.addProduct(productToCreate)
    
    return res.status(201).json({
      status: "exito",
      msg: "Producto creado",
      data: productToCreate,
    });
});

productsRoute.put("/:id", async (req, res) => {
    const id = req.params.id;
    const newProduct = req.body;
    const productCreate = await productManager.updateProduct(id, newProduct)

    if (productCreate) {
        return res.status(201).json({
            status: "exito",
            msg: "Producto modificado con exito",
            data: newProduct,
        });
    } else {
        return res.status(201).json({
            status: "error",
            msg: "No se pudo modificar el objeto",
            data: {},
        });
    }
  });