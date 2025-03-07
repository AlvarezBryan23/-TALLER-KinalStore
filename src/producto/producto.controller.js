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
        const { limite = 6, desde = 0 } = req.query
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

export const updateProducto = async(req, res) =>{
    try{
        const { num } = req.params;
        const data = req.body;

        const producto = await Producto.findByIdAndUpdate(num, data, {new:true})

        res.status(200).json({
            success: true,
            message: "Producto Actualizado",
            producto
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error al actualizar el producto",
            error: err.message
        })
    }
}

export const deleteProducto = async(req, res) =>{
    try{
        const {num} = req.params

        const producto = await Producto.findByIdAndUpdate(num, {status: false}, {new: false})

        return res.status(200).json({
            success: true,
            message: "Producto Eliminado",
            producto
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el producto",
            error: err.message
        })
    }
}   

export const productoListarOrden = async(req, res)=>{
    try{
        const { limit = 5, from = 0 } = req.query;
        const { listarOrden } = req.body; // Recibe el criterio de orden desde raw o form-data
        const query = { status: true };

        let ordenOptions = {};

        switch (listarOrden) {
            case 'categoria': 
            ordenOptions = { name: 1 }; // Ordena por nombre (A-Z)
                break;
            case 'vendido': 
            ordenOptions = { precio: -1 }; // Ordena por nombre (Z-A)
                break;
            default: 
            ordenOptions = { createdAt: -1 }; // Orden por defecto (más recientes primero)
        }

        const [total, productos] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
                .sort(ordenOptions)
                .skip(Number(from))
                .limit(Number(limit))
        ]);

        return res.status(200).json({
            success: true,
            total,
            productos
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al listar el producto",
            error: err.message
        })
    }
}