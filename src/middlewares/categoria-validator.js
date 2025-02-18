import { body, param} from "express-validator";
import { categoriaExits } from "../helpers/db-validator.js";
import { validarCampos } from "./validar-campos.js";
import { handleErrors } from "./handleErrors.js";
import { handleErrors } from "./handleErrors.js";
import { hasRoles } from "./validate-roles.js"

export const createCategoriaValidator = [
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("El nombre de la categoria es requerido"),
    validarCampos,
    handleErrors
]