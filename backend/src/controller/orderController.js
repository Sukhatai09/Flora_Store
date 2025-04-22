import z from "zod";
import { createOrderService,getAllOrdersService,updateOrderService,deleteOrderService} from "../service/orderService.js";
import dotenv from "dotenv";
dotenv.config();

const orderSchema = z.object({
    customer_id: z.string(),  // << ต้องมี
    total_amount: z.number().positive("Total amount must be a positive number"),
    status: z.enum(["pending", "completed"]).optional(),
    shipping_address: z.string(),
    payment_method: z.string()
});

export const getAllOrder = async (req, res) => {
    try {
        const orders = await getAllOrdersService();
        res.status(200).json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const createOrder = async (req, res) => {
    try {
        
        const validatedData = orderSchema.parse(req.body);

        const data = {
            ...validatedData,
            status : "pending",

        }
        const newOrder = await createOrderService(data);

        res.status(201).json({
            message: "Order created successfully",
            order_id: newOrder.order_id,
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
export const deleteOrder = async (req, res) => {
    
    try {
        const { id } = req.params;
        const deletedOrder = await deleteOrderService(id);
        res.status(200).json({
            message: "Order deleted successfully",
            data: deletedOrder,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const status = req.body.status;
        const order = await updateOrderService(id, status);
        res.status(200).json({
            message: "Order updated successfully",
            data: order,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}