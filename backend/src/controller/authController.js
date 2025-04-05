import z from "zod";
import bcrypt from "bcrypt";
import {registerService} from"../service/authService.js";

const authshcema = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(8 , "Password must be at least 8 characters long"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  phone_number: z.string().min(1, "Phone number is required"),
  role: z.enum(["admin", "user"]).optional(),
  image_url: z.string().optional(),
  address: z.string().optional(),
});

export const login = (req, res) => {
  res.send("Auth route is working!");
}

export const register = async(req, res) => {
    try{
        const validateData = authshcema.parse(req.body);
        const {password} = validateData;

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        const userData = {
            ...validateData,
            password: hashPassword,
        };

        await registerService(userData);
        res.status(201).json({message: "User created successfully!"});
    }catch(err){
        if (err instanceof z.ZodError) {
            // Handle Zod validation error
            return res.status(400).json({ message: err.errors });
          }
        res.status(400).json({message: err.message})
    }
   
  }