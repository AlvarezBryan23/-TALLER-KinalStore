"use strict"

import Compra from "../compra/compra-model.js"
import User from "../user/user.model.js"
import Carro from "../carrito/carrito-models.js"

export const saveCompra = async(req, res) =>{
    try{
        const data = req.body;
        const user = await User.findOne({email: data.email})
        const carro = await Carro.findById(id)

        if(!user){
            return res.status(404).json({
                success: false,
                message: "No existe tal usuario"
            });
        }

        if(!carro){
            return res.status(404).json({
                success: false,
                message: "Revisa tu carrito a ver si aguardaste correctamente tu producto"
            });
        }

        const compra = await Compra({
                ...data,
                Usuario: user._id,
                Carro: carro._id
        });

        await compra.save()

        res.status(200).json({
            success: true,
            message: "Tu compra se ha realizado"
        })
    }catch(err){
        res.status(err).json({
            success: false,
            message: "No se pudo realizar su compra",
            error: err.message
        })
    }
}