import z from "zod";
import {getUserByIdService,updateUserService} from "../service/userService.js";
import fs from "fs";

const usershcema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  phone_number: z.string().min(1, "Phone number is required"),
  image_url: z.string().optional(),
  address: z.string().optional(),
});
export const getUserById = async (req, res) => {
    try{
        const userId = req.params.id; // ดึง userId จาก params
        const user = await getUserByIdService(userId); // ค้นหา user โดยใช้ userId
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "User retrieved successfully",
            data: user,
        });
    }catch(err){
        if (err instanceof z.ZodError) {
            res.status(400).json({ message: err.errors });
        } else {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

export const updateUser = async (req, res) => {
    try{
        const userId = req.params.id; // ดึง userId จาก params
        const validateData = usershcema.parse(req.body); // ตรวจสอบข้อมูลด้วย Zod

        if (req.file) {
            const filePath = `./uploads/${req.file.filename}`;
            const newFilePath = `./uploads/${userId}.jpg`;
            fs.renameSync(filePath, newFilePath); // เปลี่ยนชื่อไฟล์เป็น userId.jpg
            validateData.image_url = newFilePath; // อัพเดท image_url ในข้อมูลที่ส่งไปยังฐานข้อมูล
        }
        const updatedUser = await updateUserService(userId, validateData); // อัพเดทข้อมูลของ user ในฐานข้อมูล
        

        res.status(200).json({
            message: "User updated successfully",
            data: updatedUser,
        });
    }catch(err){
        if (err instanceof z.ZodError) {
            res.status(400).json({ message: err.errors });
        } else {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

