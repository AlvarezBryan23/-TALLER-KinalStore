import { Schema, model } from "mongoose";

const categoriaSchema = Schema({
    name:{
        type:String,
        required: [true, "Category name is required"],
        maxLength: [50, "Category cannot exced 25 characters"]
    },
    role:{
        type:String,
        required: true,
        enum:["ADMIN_ROLE"]
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