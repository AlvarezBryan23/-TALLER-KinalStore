"use strict"

import Producto from "../producto/producto.models.js"
import User from "../user/user.model.js"
import Categoria from "../categoria/categoria.model.js"

export const saveProducto = async(req, res) =>{
    try{
        const data = req.body;
        const user = await User.findOne({ email: data.email})
        const categoria = await Categoria.findOne({ categoria: data.categoria})

        if(!user){
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        if(!categoria){
            return res.status(404).json({
                success: false,
                message: "La categoria no existe"
            });
        }

        const producto = new Producto({
            ...data,
            keeper: user._id,
            kep: categoria._id
        });

        await producto.save();

        res.status(200).json({
            success: true,
            producto
        })


    }catch(err){
        res.status(err).json({
            success: false,
            message: "Error al guardar el producto",
            err
        });
    }
}