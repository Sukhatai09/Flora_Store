import express from "express";
import { createFlower } from "../controller/flowerController.js";
import {upload} from "../middleware/upload.js";
import adminOnly from "../middleware/adminOnly.js";

const router = express.Router();
router.post("/flower",adminOnly, upload.single("image_url"), createFlower); //ใช้ multer ในการอัพโหลดไฟล์ภาพ

export default router;