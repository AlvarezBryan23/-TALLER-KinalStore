import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            title: "Store Kinal online",
            version: "1.0.0",
            description: "API para una tienda en linea, para usuario y administrador",
            contact:{
                name: "Bryan Alvarez",
                email: "balvarez-2023244@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://localhost:3009/KinalStore/v1"
            }
        ]
    },
    apis:[
        "./src/auth/*.js",
        "./src/user/*.js",
        "./src/categoria/*.js",
        "./src/producto/*.js"
    ]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

export {swaggerDocs, swaggerUi}