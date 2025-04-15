import express from "express";
import {getcart,createcart,deletecart} from "../controller/cartController.js"

const router = express.Router();

router.get("/cart",getcart)
router.delete("/cart/:id",deletecart)
router.post("/cart",createcart)










export default router;

