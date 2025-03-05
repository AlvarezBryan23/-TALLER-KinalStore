

import Categoria from "../categoria/categoria.model.js"


export const saveCategoria = async(req, res) =>{
    try{
        const data = req.body

        const categoria = new Categoria({
            ...data,
        })

        await categoria.save();

        res.status(200).json({
            success: true,
            categoria
        }) 
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error al guardar una categoria",
            error: err.message
        })
    }
}