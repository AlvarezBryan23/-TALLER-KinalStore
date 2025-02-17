import { Router } from "express";
import { deleteUserValidator, updatePasswordValidator, updateUserValidator } from "../middlewares/user-validator.js";
import { deleteUser, getUsers, updatePassword, updateUser } from "./user.controller.js";


const router = Router()

router.post("/register")

router.get("/", getUsers)

router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser)

router.put("/updateUser/:id", updateUserValidator, updateUser)

router.patch("/updatePassword/:id", updatePasswordValidator, updatePassword)

export default router