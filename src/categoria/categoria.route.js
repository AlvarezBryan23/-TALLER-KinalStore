import { Router } from "express";
import { deleteCategoriaValidator, saveCategoriaValidator, updateCategoriaValidator } from "../middlewares/categoria-validator.js";
import { saveCategoria, listCategoria, updateCategoria, deleteCategoria } from "../categoria/categoria.controller.js";

const router = Router();

router.post("/addCategoria", saveCategoriaValidator, saveCategoria);

router.get("/", listCategoria),

router.put("/updateCategoria/:no", updateCategoriaValidator, updateCategoria)

router.delete("/deleteCategoria/:no", deleteCategoriaValidator, deleteCategoria)

export default router;