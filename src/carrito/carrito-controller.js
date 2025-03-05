"use strict"

import Carrito from "../carrito/carrito-models.js";
import User from "../user/user.model.js"
import Producto from "../producto/producto.models.js"

export const saveCarrito = async(req, res) =>{
    try{
        const data = req.body;
        const user = await User.findOne({email: data.email})
        const producto = await Producto.findOne({name: data.name})

        if(!user){
            return res.status(404).json({
                success: false,
                message: "El usuario no existe"
            });
        }

        if(!producto){
            return res.status(404).json({
                success: false,
                message: "El producto esta agotado o ya no esta disponible",
            });
        }

        const carrito = new Carrito({
            ...data,
            Usuario: user._id,
            Product: producto._id
        });

        await carrito.save();

        res.status(200).json({
            success: true,
            carrito
        })
    }catch(err){
        res.status(err).json({
            success: false,
            message: "Error al guardar el producto en el carrito",
            err
        })
    }
}