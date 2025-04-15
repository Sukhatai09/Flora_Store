import express from "express";
import {getFlowerLike , createFlowerLike,deleteFlowerLike } from "../controller/flowerLikeController.js"

const router = express.Router();
router.get("/flowerLikes",getFlowerLike)
router.post("/flowerLikes",createFlowerLike)
router.delete("/flowerLikes",deleteFlowerLike)



export default router;