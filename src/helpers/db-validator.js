import User from "../user/user.model.js"
import Categoria from "../categoria/categoria.model.js"
import Producto from "../producto/producto.models.js"

export const existeEmail = async(email = '') =>{
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`El email ${email} ya fue registrado previamente`)
    }
}

export const existeUsername = async(username = '') =>{
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`El usuario ${username} ya fue registrado previamente`)
    }
}

export const userExits = async (uid = " ") => {
    const existe = await User.findById(uid)
    if(!existe){
        throw new Error("El usuario no existe")
    }
}

export const categoriaExits = async(no = " ") => {
    const existe = await Categoria.findById(no)
    if(!existe){
        throw new Error("El producto no existe")
    }
}

export const productoExits = async(num = " ") => {
    const existe = await Producto.findById(num)
    if(!existe){
        throw new Error("El producto no existe")
    }
}