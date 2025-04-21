import z from "zod";
import { getcartservice,createcartservice,deletecartservice } from "../service/cartService.js";


import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient(); // สร้าง instance ขึ้นมา
const cartSchema = z.object({
  customer_id: z.string().uuid()
});
export const getcart = async (req, res) => {
  try {
   
    const cart = await getcartservice();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(400).json({ error: error.message });
  }
}
export const getcartID = async (req, res) => {
  try {
    const customer_id = req.params.id; // รับ customer_id จาก URL parameter
    const cart = await prisma.cart.findUnique({
      where: {
        customer_id: customer_id,
      },
      select: {
        cart_id: true
      }
    });
    if (!cart) {
      const newCart = await prisma.cart.create({
        data: {
          customer_id: customer_id,
          updated_at: new Date(), 
        }
      });
      console.log("newcardidn",newCart.cart_id)

      // ส่ง cart_id ใหม่
      return res.status(201).json({ cart_id: newCart.cart_id });

    }

    // หากพบ cart เดิม ส่ง cart_id กลับไป
    res.status(200).json({ cart_id: cart.cart_id });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(400).json({ error: error.message });
  }
};

export const createcart = async (req, res) => {
  try {
    // const  {customer_id}  = req.body;
    // const cart = await createcartservice(customer_id);
    res.status(200).json({message: "Cart created successfully"});
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

