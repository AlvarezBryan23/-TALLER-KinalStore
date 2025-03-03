import { body, param } from "express-validator";   
import { validarCampos } from "./validar-campos.js";
import { handleErrors } from "./handleErrors.js";
import { validateJWT } from "../middlewares/validate-jwt.js"


export const saveCategoriaValidator = [
    validateJWT,
    body("description", "La descripcion es obligatoria").not().isEmpty(),
    validarCampos,
    handleErrors
]