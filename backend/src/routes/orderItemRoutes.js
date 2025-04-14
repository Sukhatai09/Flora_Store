import express from "express";
import { getallOrderItem, createOrderItem,deleteOrderItem} from "../controller/orderItemController.js";

const router = express.Router();
router.get("/orderItem",getallOrderItem);
router.post("/orderItem", createOrderItem);
router.delete("/orderItem/:id", deleteOrderItem); 

export default router;
