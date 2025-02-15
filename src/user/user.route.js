import { Router } from "express";
import { deleteUserValidator, updateUserValidator } from "../middlewares/user-validator.js";
import { deleteUser, getUsers, updateUser } from "./user.controller.js";


const router = Router()

router.post("/register")

router.get("/", getUsers)

router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser)

router.put("/updateUser/:id", updateUserValidator, updateUser)

export default router