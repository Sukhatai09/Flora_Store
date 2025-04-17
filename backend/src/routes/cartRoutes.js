import express from "express";
import {getcart,createcart,deletecart} from "../controller/cartController.js"

const router = express.Router();

router.get("/cart",getcart)
router.delete("/cart/:id",deletecart)
router.post("/cart",(req,res)=>{
   try {
    res.send("hello")
   }
   catch (error) {
    res.status(400).json({ error: error.message });
   }
})










export default router;

