import z from "zod";
import { createflowerService } from "../service/flowerService.js";

const flowerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    price: z.preprocess((val) => {
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    }, z.number().positive("Price must be a positive number")),
    image_url: z.string(),
    stock_quantity: z.preprocess((val) => {
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    }, z.number().int().nonnegative("Stock quantity must be a non-negative integer")),
  });

export const createFlower = async (req, res) => {
  try {
    const fileUrl = req.file?.path;  // ดึง path จาก multer upload
    
    // เอา req.body + image_url มารวมกันก่อน validate
    const validateData = flowerSchema.parse({
      ...req.body,
      image_url: fileUrl,  
    });

    const newFlower = await createflowerService(validateData);
    res.status(201).json({
      message: "Flower created successfully",
      data: newFlower,
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
