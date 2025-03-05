import { Router } from "express";
import { saveCarrito } from "./carrito-controller.js";


const router = Router()

router.post("/saveCarrito", saveCarrito)

export default router;