import z from "zod";
import bcrypt from "bcrypt";
import { registerService, getUserByEmail,AdminOnlyService } from "../service/authService.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient(); // สร้าง instance ขึ้นมา
const authshcema = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  phone_number: z.string().min(1, "Phone number is required"),
  role: z.enum(["admin", "user"]).optional(),
  image_url: z.string().optional(),
  address: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
export const login = async(req, res) => {
  try{
    const validateData = loginSchema.parse(req.body);  
    const { email, password } = validateData;

    const userData = await getUserByEmail(email);  //loginดึงข้อมูลของ userจากฐานข้อมูล

    if (!userData) {   //เช็คว่า user มีอยู่ในฐานข้อมูลหรือไม่
      res.status(400).json({  message: "Invalid password or email"  });
      return;
    }
    const isPasswordValid = bcrypt.compareSync(password, userData.password); //เช็คว่า password ที่กรอกมา ตรงกับ password ที่เก็บในฐานข้อมูลหรือไม่
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid password or email" });
      return;
    }
    const payloadUser = {
      id: userData.id,
      email: userData.email,
      role: userData.role,
      
    }
    const token = jwt.sign(payloadUser, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    res.status(200).json({
      message: "Login successful",
      user: {
        customer_id: userData.customer_id,
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
        phone_number: userData.phone_number,
        image_url: userData.image_url,
        address: userData.address,
        role: userData.role,
      },
      token: token,
    });

  }catch (err) {
    if (err instanceof z.ZodError) {
      // Handle Zod validation error
      res.status(400).json({ message: err.errors });
    }else{
      // Handle other errors
      res.status(400).json({ message: err.message });
    }
    
  }
  

};
export const register = async (req, res) => {
  try {
    const validateData = authshcema.parse(req.body);
    const { password } = validateData;
    const fileUrl = req.file?.path;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const userData = {
      ...validateData,
      password: hashPassword,
      image_url: fileUrl,
    };

    // Create user
    const userdata = await registerService(userData); // สมมุติว่า return ข้อมูลผู้ใช้
    const customer_id = userdata.customer_id;
    console.log("customer_id", customer_id);
    // ตรวจสอบว่ามี cart อยู่แล้วหรือยัง
    const cart = await prisma.cart.findUnique({
      where: { customer_id },
      select: { cart_id: true }
    });

    // ถ้าไม่มีให้สร้างใหม่
    if (!cart) {
      await prisma.cart.create({
        data: {
          customer_id,
          updated_at: new Date(),
        }
      });
    }

    console.log("customer_id", customer_id);

    res.status(201).json({ message: "User created successfully!" });

  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ message: err.errors });
    }
    res.status(400).json({ message: err.message });
  }
};

export const logout = async (req, res) => {
  try{
    res.clearCookie("token",{
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    }); // Clear the cookie named "token"
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export const AdminOnlyCon = async (req, res) => {
  try{
    if(!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await AdminOnlyService(req.user.email);
    res.status(200).send(user);
  }catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }

}


