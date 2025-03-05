import { Router } from "express";
import { buscarProducto, deleteProducto, listarProducto, productoListarOrden, saveProducto, updateProducto } from "./producto.controller.js";
import { buscarProductoValidator, deleteProductoValidator, saveProductoValidator, updateProductoValidator } from "../middlewares/producto-validator.js";

const router = Router()

/**
 * @swagger
 * /addProducto:
 *   post:
 *     summary: Add a new product
 *     tags: [Producto]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Laptop"
 *               price:
 *                 type: number
 *                 example: 999.99
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Product added successfully
 *       400:
 *         description: Invalid input
 */
router.post("/addProducto", saveProductoValidator, saveProducto)

/**
 * @swagger
 * /buscarProducto:
 *   get:
 *     summary: Search for a product
 *     tags: [Producto]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Product name
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */
router.get("/buscarProducto", buscarProductoValidator, buscarProducto)

/**
 * @swagger
 * /:
 *   get:
 *     summary: List all products
 *     tags: [Producto]
 *     responses:
 *       200:
 *         description: A list of products
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
 *                   price:
 *                     type: number
 *                   categoryId:
 *                     type: integer
 */
router.get("/", listarProducto)

/**
 * @swagger
 * /updateProducto/{num}:
 *   put:
 *     summary: Update a product
 *     tags: [Producto]
 *     parameters:
 *       - in: path
 *         name: num
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Smartphone"
 *               price:
 *                 type: number
 *                 example: 799.99
 *               categoryId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Product not found
 */
router.put("/updateProducto/:num", updateProductoValidator, updateProducto)

/**
 * @swagger
 * /deleteProducto/{num}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Producto]
 *     parameters:
 *       - in: path
 *         name: num
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete("/deleteProducto/:num", deleteProductoValidator, deleteProducto)

router.get("/list", productoListarOrden)

export default router;