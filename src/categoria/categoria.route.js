import { Router } from "express";
import { deleteCategoriaValidator, saveCategoriaValidator, updateCategoriaValidator } from "../middlewares/categoria-validator.js";
import { saveCategoria, listCategoria, updateCategoria, deleteCategoria } from "../categoria/categoria.controller.js";

const router = Router();

/**
 * @swagger
 * /addCategoria:
 *   post:
 *     summary: Add a new category
 *     tags: [Categoria]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Electronics"
 *     responses:
 *       200:
 *         description: Category added successfully
 *       400:
 *         description: Invalid input
 */
router.post("/addCategoria", saveCategoriaValidator, saveCategoria);

/**
 * @swagger
 * /:
 *   get:
 *     summary: List all categories
 *     tags: [Categoria]
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
router.get("/", listCategoria),

/**
 * @swagger
 * /updateCategoria/{no}:
 *   put:
 *     summary: Update a category
 *     tags: [Categoria]
 *     parameters:
 *       - in: path
 *         name: no
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Home Appliances"
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Category not found
 */
router.put("/updateCategoria/:no", updateCategoriaValidator, updateCategoria)

/**
 * @swagger
 * /deleteCategoria/{no}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categoria]
 *     parameters:
 *       - in: path
 *         name: no
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
router.delete("/deleteCategoria/:no", deleteCategoriaValidator, deleteCategoria)

export default router;