import { Router } from "express";
import { buscarProducto, deleteProducto, listarProducto, saveProducto, updateProducto } from "./producto.controller.js";
import { buscarProductoValidator, deleteProductoValidator, saveProductoValidator, updateProductoValidator } from "../middlewares/producto-validator.js";

const router = Router()

router.post("/addProducto", saveProductoValidator, saveProducto)

router.get("/buscarProducto", buscarProductoValidator, buscarProducto)

router.get("/", listarProducto)

router.put("/updateProducto/:num", updateProductoValidator, updateProducto)

router.delete("/deleteProducto/:num", deleteProductoValidator, deleteProducto)

export default router;  