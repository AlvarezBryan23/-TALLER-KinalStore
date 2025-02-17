import { hash, verify } from "argon2"
import User from "./user.model.js"


export const getUsers = async(req, res) =>{
    try{
        const { limit = 5, desde = 0}= req.query
        const query = { status: true}

        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(desde))
                .limit(Number(limit))
        ])

        return res.status(200).json({
            success: true,
            total,
            users
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al obtener los usuarios",
            error: err.message
        })
    }
}


export const deleteUser = async(req, res) =>{
    try{
        const { uid } = req.params

        const user = await User.findByIdAndUpdate(uid, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Usuario eliminado",
            user
        })
    }catch(err){
        return res.status(500).json({
             success: false,
            message: "Error al eliminar el usuario",
            error: err.message
        })
    }
}

export const updateUser = async(req, res) =>{
    try{
        const { id } = req.params;
        const data = req.body;

        const user = await User.findByIdAndUpdate(id, data, {new: true});

        res.status(200).json({
            success: true,
            message: "Usuario actualizado",
            user,
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error al actualizar al usuario",
            error: err.message
        })
    }
}

export const updatePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { newPassword } = req.body;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        const encryptedPassword = await hash(newPassword);

        await User.findByIdAndUpdate(id, { password: encryptedPassword });

        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la contraseña",
            error: err.message
        });
    }
};