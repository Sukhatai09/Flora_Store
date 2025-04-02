const prisma = require("../prismaClient");

exports.createFlowers = async (name) => {  
    return await prisma.cream.create({
      data: { name }
    });
  };