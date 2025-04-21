import express from "express";
import {getcart,createcart,deletecart, getcartID} from "../controller/cartController.js"
import prisma from "../prismaClient.js";
const router = express.Router();


router.get("/cart",getcart)

router.get("/cart/:id",getcartID)
router.delete("/cart/:id",deletecart)
router.post("/cart",async(req,res)=>{
    try{
        const id = req.body.customer_id
        if(!id){
            return res.status(400).json({message:"customer_id is required"})
        }
    const newcart = await prisma.cart.create({
        data:{
            customer_id:id
        }
    })
    return res.status(201).json(newcart)
        
    }catch(error){
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }})










export default router;

