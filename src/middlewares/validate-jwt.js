import jwt from "jsonwebtoken"
import User from "../user/user.model.js"

export const validateJWT = async(req, res, next) =>{
    try{
        let token = req.body.token || req.query.token || req.headers["authorization"]

        if(!token){
            res.status(400).json({
                success: false,
                message: "No existe token en la validacion"
            })
        }

        token = token.replace(/^Bearer\s+/, "")

        const { uid } = jwt.verify(token, process.env.SECRET_KEY)

        const user = await User.findById(uid)

        if(!user){
            return res.status(400).json({
                success: false,
                message: "El user no existe en la base de datos"
            })
        }

        if(user.status === false){
            return res.status(400).json({
                success: false,
                message: "El admin si esta"
            })
        }

        req.user = user,
        next()
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al validar el token",
            error: err.message
        })
    }
}