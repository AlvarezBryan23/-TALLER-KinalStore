import { Router } from "express";
import { saveCategoria } from "./categoria.controller.js";
import { createCategoriaValidator } from "../middlewares/categoria-validator.js";

const router = Router()

router.post("/addCategoria", createCategoriaValidator, saveCategoria)

export default router