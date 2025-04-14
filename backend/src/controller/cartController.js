import z from "zod";
import { getcartservice,createcartservice,deletecartservice } from "../service/cartService.js";

const cartSchema = z.object({
  customer_id: z.string().uuid()
});
export const getcart = async (req, res) => {
  try {
   
    const cart = await getcartservice();
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const createcart = async (req, res) => {
  try {
    const  customer_id  = cartSchema.parse(req.body);
    const cart = await createcartservice(customer_id);
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
export const deletecart = async (req, res) => {
    try {
        const customer_id = req.params.customer_id;
        const cart = await deletecartservice(customer_id);
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

