import { Schema, model } from "mongoose";

const carritoSchema = Schema({
    Usuario:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    Product:{
        type: Schema.Types.ObjectId,
        ref: 'producto'
    },
    fecha:{
        type:Date,
        required: true
    },
    description:{
        type: String,
        required: [true, "Description is required"],
        maxLength: [200, "Description cannot exced 200 characteres"]
    },
    status:{
        type: Boolean,
        default: true
    }
})

export default model("Carrito", carritoSchema)