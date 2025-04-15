import z from "zod";
import { getcartItemService,createcartItemService } from "../service/cartItemService.js";

const cartItemSchema = z.object(
    {
    cart_id : z.string().uuid(),
    flower_id: z.string().uuid(),
    quantity: z.number().int().positive()
    }

)

export const getcartItem = async (req, res) => {
    try {
        const cartItem = await getcartItemService();
        res.status(200).json(cartItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
export const createcartItem = async (req, res) => {
    try {
        const cartItem = cartItemSchema.parse(req.body);
        const newCartItem = await createcartItemService(cartItem);
        res.status(200).json(newCartItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}