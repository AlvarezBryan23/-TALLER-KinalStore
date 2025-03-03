import { Schema, model } from "mongoose";

const categoriaSchema = Schema({
    categoria:{
        type: String,
        required: true,
        enum:["ELECTRONICA", "ROPA", "HOGAR_COCINA", "JUGUETES", "DEPORTE", "MUSICA", 
            "ALIMENTOS", "PELICULAS", "LIBROS", "ACCESORIOS"]
    },
    description:{
        type: String,
        required: [true, "Description is required"],
        maxLength: [200, "Description cannot exced 200 characters"]
    },
    status:{
        type:Boolean,
        default:true
    }
},
{
    versionKey: false,
    timeStamps: true
})


export default model("Categoria", categoriaSchema)