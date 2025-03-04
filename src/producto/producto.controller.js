"use strict"

import Producto from "../producto/producto.models.js"
import Categoria from "../categoria/categoria.model.js"

export const saveProducto = async(req, res) =>{
    try{
        const data = req.body;
        const categoria = await Categoria.findOne({ categoria: data.categoria})

        if(!categoria){
            return res.status(404).json({
                success: false,
                message: "La categoria no existe"
            });
        }

        const producto = new Producto({
            ...data,
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

export const buscarProducto = async(req, res) =>{
    try{
        const { name } = req.body;
        const producto = await  Producto.findOne({name})

        if(!producto){
            return res.status(404).json({
                success: false,
                message: "Este producto no esta disponible"
            })
        }

        return res.status(200).json({
            sucess: true,
            producto
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error en tu busqueda",
            error: err.message
        })
    }
}  

export const listarProducto = async(req, res) =>{
    try{
        const { limite = 1, desde = 0 } = req.query
        const query = { status: true }
        
        const [total, productos ] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
                    .skip(Number(desde))
                    .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            productos
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener los productos",
            error: err.message
        })
    }
}