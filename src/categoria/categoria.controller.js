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

export const listCategoria = async(req, res) =>{
    try{
        const { limite = 11, desde = 0 } = req.query
        const query = {status: true}

        const [total, categoria ] = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
                     .skip(Number(desde))
                     .limit(Number(limite))
        ])

        return res.status(200).json({
            success: true,
            total,
            categoria
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error al obtener las categorias",
            error: err.message
        })
    }
}

export const updateCategoria = async(req, res) =>{
    try{
        const { no } = req.params;
        const data = req.body;

        const categoria = await Categoria.findByIdAndUpdate(no, data, {new:true})

        res.status(200).json({
            success: true,
            message: "Categoria actualizada",
            categoria
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error al actualizar la categoria",
            error: err.message
        });
    }
}

export const deleteCategoria = async(req, res) =>{
    try{
        const {no} = req.params

        const categoria = await Categoria.findByIdAndUpdate(no, {status: false}, {new: false})

        return res.status(200).json({
            success: true,
            message: "Categoria Eliminada",
            categoria
        })
        
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la categoria",
            error: err.message
        })
    }
}