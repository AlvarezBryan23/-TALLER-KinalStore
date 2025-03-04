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