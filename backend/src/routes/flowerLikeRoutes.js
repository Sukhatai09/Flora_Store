import express from "express";
import {getFlowerLike,getFlowerLikeByCustomerId,createFlowerLike,deleteFlowerLike } from "../controller/flowerLikeController.js"

const router = express.Router();
router.get("/flowerLikes/:id",getFlowerLikeByCustomerId) //ดึงข้อมูลทั้งหมด
router.get("/flowerLikes",getFlowerLike)
router.post("/flowerLikes",createFlowerLike)
router.delete("/flowerLikes",deleteFlowerLike)



export default router;