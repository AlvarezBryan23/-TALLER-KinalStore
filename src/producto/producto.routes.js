import { Router } from "express";
import { saveProducto } from "./producto.controller.js";
import { saveProductoValidator } from "../middlewares/producto-validator.js";

const router = Router()

router.post("/addProducto", saveProductoValidator, saveProducto)

export default router;