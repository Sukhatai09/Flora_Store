const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const flowerRouter = require("./routes/flowerRouter");


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use("/api", flowerRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${port}`);
});
