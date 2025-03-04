import { Schema, model } from "mongoose";

const productoSchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    description:{
        type: String,
        required: [true, "Description is required"],
        maxLength: [200, "Description cannot exced 200 characters"],
    },
    precio: {
        type:Number,
    },
    marca:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"] 
    },
    kep:{
        type: Schema.Types.ObjectId,
        ref: 'categoria'
    },
    status:{
        type: Boolean,
        default: true
    }
})

export default model("Producto", productoSchema)