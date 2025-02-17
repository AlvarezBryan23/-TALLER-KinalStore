import { Schema, model } from "mongoose";

const categoriaSchema = Schema({
    name:{
        type:String,
        required: [true, "Category name is required"],
        maxLength: [50, "Category cannot exced 25 characters"]
    },
    description:{
        type: String,
        required: [true, "Description is required"],
        maxLength: [25, "Description cannot exced 25 characters"]
    },
    role:{
        type:String,
        required: true,
        enum:["ELECTRONICA", "ROPA", "HOGAR_COCINA", "JUGUETES", "DEPORTE", "MUSICA", 
            "ALIMENTOS", "PELICULAS", "LIBROS", "ACCESORIOS"]
    },
    keeper:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
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