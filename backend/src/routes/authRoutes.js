import express from "express";
import { login,register } from "../controller/authController.js";
import {upload} from "../middleware/upload.js";
const router = express.Router();

router.post("/login",login);
router.post("/register",upload.single("image_url"),register);

export default router;