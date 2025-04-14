import express from "express";
import {getcartItem,createcartItem } from "../controller/cartItemController.js";


const router = express.Router();

router.get("/cartItems", getcartItem);
router.post("/cartItems", createcartItem);


export default router;