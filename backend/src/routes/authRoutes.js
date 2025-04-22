import express from "express";
import { login,register,logout,AdminOnlyCon } from "../controller/authController.js";
import adminOnly from "../middleware/adminOnly.js";
import {upload} from "../middleware/upload.js";
const router = express.Router();

router.post("/login",login);
router.post("/register",upload.single("image_url"),register);
router.get("/logout",logout);
router.get("/adminOnly", adminOnly, AdminOnlyCon); // ใช้ middleware adminOnly

export default router;