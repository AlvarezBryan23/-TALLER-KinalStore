import User from "../user/user.model.js"
import { hash } from "argon2"

export const register = async (req, res) =>{
    try{
        const data = req.body

        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword

        const user = await User.create(data)
        return res.status(201).json({
            message: "User has been registered",
            name: user.name,
            email: user.email
        })
    }catch(err){
        console.log(err.message)
        return res.status(500).json({
            message: "User registration failed",
            error: err.message
        })
    }
}