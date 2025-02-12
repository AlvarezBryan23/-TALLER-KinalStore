import mongoose, { Schema, model, version } from "mongoose";

const userSchema = Schema({
    name:{
        type:String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    surname:{
        type: String,
        required: [true, "Surname is required"],
        maxLength: [25, "Surname cannot exceed 25 characters"]
    },
    username:{
        type:String,
        required: true,
        unique: true
    },
    email: {
        type:String,
        required: [true, "Email is required"],
        unique: true
    },
    profilePicture:{
        type:String
    },
    phone: {
        type:String,
        required: true,
        minLength: 8,
        maxLength: 8
    },
    role:{
        type:String,
        required: true,
        enum: ["ADMIN_ROLE", "CLIENT_ROLE"]
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false,
    timeStamps: true
}
)

export default mongoose.model("User", userSchema)