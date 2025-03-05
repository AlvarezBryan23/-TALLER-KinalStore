import { body, param } from "express-validator"
import { productoExits } from "../helpers/db-validator.js"
import { validarCampos } from "./validar-campos.js"
import { handleErrors } from "./handleErrors.js"

export const saveProductoValidator = [
    body("name").notEmpty().withMessage("El nombre del producto es requerido"),
    body("description").notEmpty().withMessage("La descripcion es requerida"),
    validarCampos,
    handleErrors
]

export const buscarProductoValidator = [
    body("name").isString().withMessage("No es un nombre válido"),
    validarCampos,
    handleErrors
]

export const updateProductoValidator = [
    param("num", "No es un ID válido").isMongoId(),
    param("num").custom(productoExits),
    validarCampos,
    handleErrors
]

export const deleteProductoValidator = [
    param("num").isMongoId().withMessage("No es un ID válido"),
    param("num").custom(productoExits),
    validarCampos,
    handleErrors
]