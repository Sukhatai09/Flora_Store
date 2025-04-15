import z from "zod";
import { createflowerService,getflowerByIdService,getAllflowerService, updateflowerService ,deleteFlowerService} from "../service/flowerService.js";
import fs from "fs";

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

export const getFlowerById = async (req, res) => {
  try {
    const { id } = req.params; // ดึง id จาก params
    const flower = await getflowerByIdService(id); // ค้นหาข้อมูลใน database
    if (!flower) {
      return res.status(404).json({ message: "Flower not found" });
    }
    res.status(200).json({
      message: "Flower retrieved successfully",
      data: flower,
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

export const getAllFlower = async (req, res) => {
  try{
    const page = parseFloat(req.query.page ) || 1;
    const limit = parseFloat(req.query.limit ) || 10;
    const skip = (page - 1) * limit;
    const flowers = await getAllflowerService(skip, limit); // ค้นหาข้อมูลใน database
    res.status(200).json({
      message: "Flowers retrieved successfully",
      data: flowers,
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
  

export const updateFlower = async (req, res) => {
  try{
    const { id } = req.params; // ดึง id จาก params
    
    const fileUrl = req.file?.path; // ดึง path จาก multer upload
  
    const validateData = flowerSchema.parse({...req.body,image_url:fileUrl}); // validate ข้อมูลที่ส่งมาใน body
    const updatedFlower = await updateflowerService(id, validateData); // อัพเดตข้อมูลใน database
    res.status(200).json({
      message: "Flower updated successfully",
      data: updatedFlower,
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

export const deleteFlower = async (req, res) => {
  try{
    const { id } = req.params; // ดึง id จาก params
    
    // ลบข้อมูลใน database
    const deletedFlower = await deleteFlowerService(id); 
    
    // ลบไฟล์ภาพจาก server
    const filePath = deletedFlower.image_url; // ดึง path ของไฟล์ภาพที่ต้องการลบ
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`File ${filePath} deleted successfully`);
      }
    });
    
    res.status(200).json({
      message: "Flower deleted successfully",
      data: deletedFlower,
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