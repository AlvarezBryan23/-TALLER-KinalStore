import { Router } from "express";
import { register, login, loginA } from "./auth.controller.js";
import { registerValidator, loginValidator } from "../middlewares/check-validator.js";
import { uploadProfilePicture } from "../middlewares/multer-upload.js";


const router = Router()

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: profilePicture
 *         type: file
 *         description: The user's profile picture.
 *       - in: formData
 *         name: name
 *         type: string
 *         required: true
 *         description: The user's name.
 *       - in: formData
 *         name: email
 *         type: string
 *         required: true
 *         description: The user's email.
 *       - in: formData
 *         name: password
 *         type: string
 *         required: true
 *         description: The user's password.
 *     responses:
 *       201:
 *         description: User has been registered
 *       500:
 *         description: User registration failed
 */
router.post("/register", uploadProfilePicture.single("profilePicture"), registerValidator, register)

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     parameters:
 *       - in: body
 *         name: email
 *         type: string
 *         required: true
 *         description: The user's email.
 *       - in: body
 *         name: username
 *         type: string
 *         required: true
 *         description: The user's username.
 *       - in: body
 *         name: password
 *         type: string
 *         required: true
 *         description: The user's password.
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       400:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error al iniciar sesión
 */
router.post("/login", loginValidator, login)

/**
 * @swagger
 * /loginA:
 *   post:
 *     summary: Admin login
 *     parameters:
 *       - in: body
 *         name: email
 *         type: string
 *         required: true
 *         description: The admin's email.
 *       - in: body
 *         name: username
 *         type: string
 *         required: true
 *         description: The admin's username.
 *       - in: body
 *         name: password
 *         type: string
 *         required: true
 *         description: The admin's password.
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       400:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error al iniciar sesión
 */
router.post("/loginA", loginValidator, loginA)

export default router