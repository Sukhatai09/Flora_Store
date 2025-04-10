import z from "zod";
import { createOrderService } from "../service/orderService.js";
import dotenv from "dotenv";
dotenv.config();

const orderSchema = z.object({
    customer_id: z.string(),  // << ต้องมี
    total_amount: z.number().positive("Total amount must be a positive number"),
    status: z.enum(["pending", "completed", "shipped"]).optional(),
    shipping_address: z.string(),
    payment_method: z.string()
});

export const createOrder = async (req, res) => {
    try {
        
        const validatedData = orderSchema.parse(req.body);
        const newOrder = await createOrderService(validatedData);
        res.status(201).json({
            message: "Order created successfully",
            data: newOrder,
        });
    } catch (err) {
        if (err instanceof z.ZodError) {
            res.status(400).json({ message: err.errors });
        } else {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}
