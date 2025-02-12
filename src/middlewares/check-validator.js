import { check } from "express-validator";
import { existeEmail } from "../helpers/db-validator.js";
import { validarCampos } from "./validar-campos.js";

export const registerValidator = [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "Ingrese un correo válido").isEmail(),
    check("email").custom(existeEmail),
    validarCampos
]

