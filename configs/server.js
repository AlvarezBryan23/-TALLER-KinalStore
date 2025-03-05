"use strict"

import express from 'express'
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from './mongo.js'
import { saveAdmin } from "../src/admin/admin-controller.js"
import authRoutes from "../src/auth/auth.route.js"
import userRoutes from "../src/user/user.route.js"
import categoriaRoutes from "../src/categoria/categoria.route.js"
import productoRoutes from "../src/producto/producto.routes.js"
import apiLimiter from '../src/middlewares/validar-cant-peticiones.js'
import carritoRoutes from "../src/carrito/carrito-routes.js"
import { swaggerDocs, swaggerUi } from './swagger.js'

const middlewares = (app) =>{
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors({
        origin: '*', 
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use(helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", `http://localhost:${process.env.PORT}`],
                connectSrc: ["'self'", `http://localhost:${process.env.PORT}`],
                imgSrc: ["'self'", "data:"],
                styleSrc: ["'self'", "'unsafe-inline'"],
            },
        },
    }));
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) =>{
    app.use("/kinalStore/v1/auth", authRoutes)
    app.use("/kinalStore/v1/user", userRoutes)
    app.use("/kinalStore/v1/categoria", categoriaRoutes)
    app.use("/kinalStore/v1/producto", productoRoutes)
    app.use("/kinalStore/v1/carro", carritoRoutes)
    app.use("/KinalStore/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

const ConnectarDB = async() =>{
    try{
        await dbConnection()
        await saveAdmin()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
    }
}

export const initServer = () => {
    const app = express()
    try{
        middlewares(app)
        ConnectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port: ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}