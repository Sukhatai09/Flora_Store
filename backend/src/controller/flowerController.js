const prisma = require("../prismaClient");
const { createFlowers } = require("../service/flowerService");

exports.createFlower = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send("Name is required");
    }
    const flower = await createFlowers(name);
    res.status(201).json({
        message: "Flower created successfully",
        flower,
    });
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error" + e.message);
  }
};
