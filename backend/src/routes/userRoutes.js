import express from "express";
import {upload} from "../middleware/upload.js";
import {getUserById,updateUser} from "../controller/userController.js";

const router = express.Router();
router.get("/user/:id", getUserById); // ดึงข้อมูล user โดยใช้ userId
router.put("/user/:id",upload.single("image_url"), updateUser); // อัพเดทข้อมูล user โดยใช้ userId

export default router;