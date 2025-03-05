import { Router } from "express";
import { saveCategoriaValidator } from "../middlewares/categoria-validator.js";
import { saveCategoria } from "../categoria/categoria.controller.js";

const router = Router();

router.post("/addCategoria", saveCategoriaValidator, saveCategoria);

export default router;