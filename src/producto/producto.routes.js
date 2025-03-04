import { Router } from "express";
import { buscarProducto, listarProducto, saveProducto } from "./producto.controller.js";
import { buscarProductoValidator, saveProductoValidator } from "../middlewares/producto-validator.js";

const router = Router()

router.post("/addProducto", saveProductoValidator, saveProducto)

router.get("/buscarProducto", buscarProductoValidator, buscarProducto)

router.get("/", listarProducto)

export default router;