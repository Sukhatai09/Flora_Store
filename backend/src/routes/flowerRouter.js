const express = require("express");
const prisma = require("../prismaClient");
const router = express.Router();

router.post("/cream", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send("Name is required");
    }
    const flower = await prisma.Cream.create({
      data: {
        name: name,
      },
    });
    res.status(201).json(flower);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error" + e.message);
  }
});

module.exports = router;
