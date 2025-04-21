import express from "express";
import {getcartItem,createcartItem, deletecartItem, getcartItemID } from "../controller/cartItemController.js";
import prisma from "../prismaClient.js";



const router = express.Router();

router.put("/cartItems", async (req, res) => {
    try {
       
        const { quantity,id } = req.body;
        const updatedCartItem = await prisma.cartItem.update({
            where: { cart_item_id: id },
            data: { quantity },
        });
        res.status(200).json(updatedCartItem);
    } catch (error) {
        console.error("Error updating cart item:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/cartItems", getcartItem);
router.get("/cartItems/:id", getcartItemID);
router.post("/cartItems", createcartItem);
router.delete("/cartItems", deletecartItem);

export default router;