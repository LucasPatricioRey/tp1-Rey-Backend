import express from "express";
import { productsRoute } from "./routes/product.routes.js";
import { cartsRoute } from "./routes/carts.routes.js"
const app = express();
const port = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.status(200).json({
    status: "exito", 
    msg: "Json conectado",
  });
});

/* ENDPOINTS */
app.use("/api/products", productsRoute);
app.use("/api/carts", cartsRoute);

app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "Pagina no encontrada",
    data: {},
  });
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en el puerto http://localhost:${port}`);
});