import { body, param } from "express-validator";
import { existeEmail, userExits } from "../helpers/db-validator.js";
import { validarCampos } from "./validar-campos.js";    
import { handleErrors } from "./handleErrors.js";
import { deleteFileOnError } from "./delete-file-on-errors.js";

export const registerValidator = [
    body("name", "El nombre es obligatorio").not().isEmpty(),
    body("username", "El username es obligatorio").not().isEmpty(), 
    body("email", "El correo es obligatorio").not().isEmpty(),
    body("email", "Ingrese un correo válido").isEmail(),
    body("email").custom(existeEmail),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("Ingrese un correo válido"),
    body("username").optional().isString().withMessage("Ingrese un username válido"),
    body("password").isLength({min: 8}).withMessage("La contraseña debe tener 8 caracteres"),
    validarCampos,
    handleErrors
]

export const updateUserValidator = [
    param("id").isMongoId().withMessage("No es un ID válido"),
    param("id").custom(userExits),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const deleteUserValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido"),
    param("uid").custom(userExits),
    validarCampos,
    handleErrors
]