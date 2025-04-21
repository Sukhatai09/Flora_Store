import express from "express";
import { createFlower,getFlowerById,getAllFlower,updateFlower,deleteFlower } from "../controller/flowerController.js";
import {upload} from "../middleware/upload.js";
import adminOnly from "../middleware/adminOnly.js";


const router = express.Router();
router.get("/flower/:id",getFlowerById); //ดึงข้อมูลทั้งหมด
router.get("/flower",getAllFlower); //ดึงข้อมูลทั้งหมด
router.post("/flower", upload.single("image_url"), createFlower); //ใช้ multer ในการอัพโหลดไฟล์ภาพ
router.put("/flower/:id", upload.single("image_url"), updateFlower); //ใช้ multer ในการอัพโหลดไฟล์ภาพ
router.delete("/flower/:id",deleteFlower); //ใช้ multer ในการอัพโหลดไฟล์ภาพ
export default router;