import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${port}`);
});
