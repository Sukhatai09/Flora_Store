import z from "zod";
import {
  getAllOrderItemService,
  createOrderItemService,
  deleteOrderItemService,
} from "../service/orderItemService.js";
import prisma from "../prismaClient.js";
export const orderItemSchema = z.object({
  order_id: z.string().uuid("Invalid order ID format"),
  flower_id: z.string().uuid("Invalid product ID format"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
  price: z.number().positive("Price must be a positive number").optional(),
});

export const getallOrderItem = async (req, res) => {
  try {
    const order = await getAllOrderItemService();
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({
      message: "Order retrieved successfully",
      data: order,
    });
  } catch (error) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ message: err.errors });
    } else {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export const createOrderItem = async (req, res) => {
  try {
    console.log("first")
    const validatedData = orderItemSchema.parse(req.body);
    console.log(req.body);
    const { quantity } = validatedData;
    const flower = await prisma.flower.findUnique({
      where: {
        flower_id: validatedData.flower_id,
      },
    });

    if (!flower) {
      return res.status(404).json({ message: "Flower not found" });
    }

    const calPrice = flower.price * quantity;

    const orderItemData = {
      ...validatedData,
      price: calPrice,
    };
    const newOrderItem = await createOrderItemService(orderItemData);
    res.status(201).json({
      message: "Order item created successfully",
      data: newOrderItem,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err)
      res.status(400).json({ message: err.errors });
    } else {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
export const deleteOrderItem = async (req, res) => {
  try{
    const {id} = req.params;
    const orderItem = await deleteOrderItemService(id);
    if (!orderItem) {
      return res.status(404).json({ message: "Order item not found" });
    }
    res.status(200).json({
      message: "Order item deleted successfully",
      data: orderItem,
    });

  }catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ message: err.errors });
    } else {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}