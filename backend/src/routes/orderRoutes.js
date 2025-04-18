import express from "express";
import { createOrder,getAllOrder,deleteOrder,updateOrder } from "../controller/orderController.js";


const router = express.Router();
router.post("/order", createOrder); // สร้าง order ใหม่ในฐานข้อมูล
router.get("/order", getAllOrder); // ดึงข้อมูล order ทั้งหมดจากฐานข้อมูล
router.delete("/order/:id", deleteOrder); // ลบ order ตาม id ที่ส่งมา
router.put("/order/:id",updateOrder)



export default router;