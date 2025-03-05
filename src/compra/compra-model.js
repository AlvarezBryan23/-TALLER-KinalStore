import { Schema, model } from "mongoose";
import { ref } from "pdfkit";

const compraSchema = Schema({
    Usuario:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    Carro: {
        type: Schema.Types.ObjectId,
        ref: 'carrito'
    },
    status:{
        type: Boolean,
        default: true
    }
})

export default model("Comprar", compraSchema)