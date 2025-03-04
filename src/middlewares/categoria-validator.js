import { body, param } from "express-validator";   
import { validarCampos } from "./validar-campos.js";
import { handleErrors } from "./handleErrors.js";
import { validateJWT } from "../middlewares/validate-jwt.js"
import { categoriaExits } from "../helpers/db-validator.js";


export const saveCategoriaValidator = [
    validateJWT,
    body("description", "La descripcion es obligatoria").not().isEmpty(),
    validarCampos,
    handleErrors
]

export const updateCategoriaValidator = [
    param("no", "No es un ID válido").isMongoId(),
    param("no").custom(categoriaExits),
    validarCampos,
    handleErrors
]

export const deleteCategoriaValidator = [
    param("no").isMongoId().withMessage("No es un ID válido"),
    param("no").custom(categoriaExits),
    validarCampos,
    handleErrors
]