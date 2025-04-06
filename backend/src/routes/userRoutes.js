import express from "express";

import {getUserById} from "../controller/userController.js";

const router = express.Router();
router.get("/user/:id", getUserById); // ดึงข้อมูล user โดยใช้ userId

export default router;