import z from "zod";
import { getcartItemService,createcartItemService, deletecartItemService } from "../service/cartItemService.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient(); // สร้าง instance ขึ้นมา
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


export const getcartItemID = async (req, res) => {
    // กำหนด Cache-Control header


    const card_item = req.params.id;
    console.log("fdsfsdfds");
    console.log(card_item);

    try {
        const data = await prisma.cartItem.findMany({
            where: { cart_id: card_item }
        });
        
        res.status(200).json(data);

        // ส่งข้อมูลกลับไปยัง client
        return data
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).json({ error: error.message });
    }
};

export const createcartItem = async (req, res) => {
    try {
        const customerID = req.body.customerid;
        const flowerId = req.body.flower_id;
        const quantity = req.body.quantity;

        // 1. หา cart_id จาก customer_id
        const result = await prisma.cart.findUnique({
            where: { customer_id: customerID },
            select: { cart_id: true }
        });

        if (!result) {
            return res.status(404).json({ message: "Cart not found for customer." });
        }

        const cartId = result.cart_id;

        // 2. เช็กว่า flower_id นี้มีอยู่ใน cart แล้วหรือยัง
        const existingItem = await prisma.cartItem.findFirst({
            where: {
                cart_id: cartId,
                flower_id: flowerId
            }
        });

        if (existingItem) {
            // 3. ถ้ามีอยู่แล้ว => update เพิ่มจำนวน
            const updatedItem = await prisma.cartItem.update({
                where: {
                    cart_item_id: existingItem.cart_item_id
                },
                data: {
                    quantity: existingItem.quantity + quantity
                }
            });

            return res.status(200).json(updatedItem);
        } else {
            // 4. ถ้าไม่มี => สร้างใหม่
            const newCartItem = await prisma.cartItem.create({
                data: {
                    cart_id: cartId,
                    flower_id: flowerId,
                    quantity: quantity
                }
            });

            return res.status(201).json(newCartItem);
        }
    } catch (error) {
        console.error("Error creating cart item:", error);
        res.status(500).json({ error: error.message });
    }
};


export const deletecartItem = async (req, res) => {
    try {
        const { cart_item_id } = req.body;
        const deletedCartItem = await deletecartItemService(cart_item_id);
        res.status(200).json(deletedCartItem);
    } catch (error) {
        console.error("Error deleting cart item:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
