import express from "express";
import { createFlower,getFlowerById,updateFlower,deleteFlower } from "../controller/flowerController.js";
import {upload} from "../middleware/upload.js";
import adminOnly from "../middleware/adminOnly.js";


const router = express.Router();
router.get("/flower/:id",getFlowerById); //ดึงข้อมูลทั้งหมด
router.post("/flower",adminOnly, upload.single("image_url"), createFlower); //ใช้ multer ในการอัพโหลดไฟล์ภาพ
router.put("/flower/:id",adminOnly, upload.single("image_url"), updateFlower); //ใช้ multer ในการอัพโหลดไฟล์ภาพ
router.delete("/flower/:id",adminOnly,deleteFlower); //ใช้ multer ในการอัพโหลดไฟล์ภาพ
export default router;