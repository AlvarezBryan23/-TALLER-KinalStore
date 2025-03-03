import { body, param } from "express-validator";   
import { validarCampos } from "./validar-campos.js";
import { handleErrors } from "./handleErrors.js";
import { deleteFileOnError } from "./delete-file-on-errors.js";


export const saveCategoriaValidator = [
    body("description", "La descripcion es obligatoria").not().isEmpty(),
    validarCampos,
    deleteFileOnError,
    handleErrors
]