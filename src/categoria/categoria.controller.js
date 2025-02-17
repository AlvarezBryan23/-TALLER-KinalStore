'use strict';

import Categoria from "./categoria.model.js"
import User from "../user/user.model.js"

export const registerCategoria = async(req, res) =>{
    try{
        const data = req.body;
        const user = req.usuario;

        if(!user || !user._id){
            return res.status(404).json({
                success: false,
                message: "El usuario no existe"
            });
        }

        const categoria = new Categoria({
            ...data,    
            usuario: user._id
        });

        await categoria.save();

        res.status(200).json({
            success: true,
            categoria
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error al registrar la categoria",
            error: err.message
        });
    }
}