import express from "express";
import { CartManager } from "../manager/cartManager.js";
const cartManager = new CartManager();

export const cartsRoute = express.Router();

cartsRoute.get("/:cid", async (req, res) => {
    const cartId = req.params.cid;
    const cart = await cartManager.getCart(cartId);

    if (cart) {
        return res.status(201).json({
            status: "exito",
            msg: `carrito: ${cartId}`,
            data: cart,
        })
    } else {
        return res.status(404).json({
            status: "error",
            msg: `carrito: ${cartId}, no existe. Agregue un producto por favor`,
            data: {},
        })
    }
});

cartsRoute.post("/:cid/product/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid
    const productAddToCart = await cartManager.addItemToCart(cartId, productId);
    const cart = await cartManager.getCart(cartId);

    if (productAddToCart) {
        return res.status(201).json({
            status: "exito",
            msg: "Producto agregado",
            data: cart,
        })
    } else {
        return res.status(404).json({
            status: "error",
            msg: "Producto no agregado",
            data: {},
        }) 
    }
});