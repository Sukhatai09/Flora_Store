import prisma from "../prismaClient.js";

export const createflowerService = async (flowerData) => {
    return await prisma.flower.create({
        data: flowerData,
    });
}