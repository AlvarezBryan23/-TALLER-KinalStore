import {body, param} from "express-validator"
import { categoriaExits } from "../helpers/db-validator.js"
import { validarCampos } from "./validar-campos.js"
import { handleErrors } from "./handleErrors.js"
import { deleteFileOnError } from "./delete-file-on-errors.js"

export const registerCategoriaValidator = [
    body("name").notEmpty().withMessage("El nombre del producto es requerido"),
    body("description").notEmpty().withMessage("La descripcion es requerida"),
    validarCampos,
    handleErrors
]

export const updateCategoriaValidator = [
    param("no").isMongoId().withMessage("No es un numero de producto válido"),
    param("no").custom(categoriaExits),
    body("role").optional().isIn(["ELECTRONICA", "ROPA", "HOGAR_COCINA", 
        "JUGUETES", "DEPORTE", "MUSICA", "ALIMENTOS", "PELICULAS", "LIBROS", "ACCESORIOS"])
        .withMessage("No contamos con esa categoria"),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const deleteCategoriaValidator = [
    param("no").isMongoId().withMessage("No es un numero de cateogoria valida"),
    param("no").custom(categoriaExits),
    validarCampos,
    handleErrors
]