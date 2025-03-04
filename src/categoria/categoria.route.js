import { Router } from "express";
import { saveCategoriaValidator } from "../middlewares/categoria-validator.js";
import { saveCategoria, listCategoria } from "../categoria/categoria.controller.js";

const router = Router();

router.post("/addCategoria", saveCategoriaValidator, saveCategoria);

router.get("/", listCategoria)

export default router;