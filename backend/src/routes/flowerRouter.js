const express = require("express");
const prisma = require("../prismaClient");
const router = express.Router();

const  flowerController = require("../controller/flowerController");

router.post("/cream",flowerController.createFlower);

module.exports = router;
