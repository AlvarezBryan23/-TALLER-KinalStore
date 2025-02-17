import { Router } from "express";
import { registerCategoria } from "./categoria.controller.js";
import { registerCategoriaValidator } from "../middlewares/categoria-validator.js";

const router = Router()

router.post("/registerCategoria", registerCategoriaValidator, registerCategoria)

export default router