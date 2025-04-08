import express from "express";
import { createOrder } from "../controller/orderController.js";


const router = express.Router();
router.post("/order", createOrder); // สร้าง order ใหม่ในฐานข้อมูล

export default router;