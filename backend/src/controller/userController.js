import z from "zod";
import {getUserByIdService} from "../service/userService.js";


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
