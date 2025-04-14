import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import flowerRoutes from "./routes/flowerRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderItemRoutes from "./routes/orderItemRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import cartItemRoutes from "./routes/cartItemRoutes.js";
import flowerLikeRoutes from "./routes/flowerLikeRoutes.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api', authRoutes);
app.use('/api',flowerRoutes);
app.use('/api',orderRoutes);
app.use('/api',userRoutes);
app.use('/api',orderItemRoutes);
app.use('/api',cartRoutes);
app.use('/api',cartItemRoutes);
app.use('/api',flowerLikeRoutes);


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${port}`);
});
