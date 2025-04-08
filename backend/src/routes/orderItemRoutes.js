import express from "express";
import { getallOrderItem, createOrderItem} from "../controller/orderItemController.js";

const router = express.Router();
router.get("/orderItem",getallOrderItem);
router.post("/orderItem", createOrderItem); 

export default router;
