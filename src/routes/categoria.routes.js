import express from 'express';
import { registerCategoria } from '../categoria/categoria.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/categoria', authMiddleware, registerCategoria);

export default router;
