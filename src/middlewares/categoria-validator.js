import { body, param} from "express-validator";
import { categoriaExits } from "../helpers/db-validator.js";
import { validarCampos } from "./validar-campos.js";
import { handleErrors } from "./handleErrors.js";
import { hashRoles } from "./validate-roles.js"

export const createCategoriaValidator = [
    hashRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("El nombre de la categoria es requerido"),
    validarCampos,
    handleErrors
]