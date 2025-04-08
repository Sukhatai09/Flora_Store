import prisma from "../prismaClient.js";

export const createflowerService = async (flowerData) => {
    return await prisma.flower.create({
        data: flowerData,
    });
}

export const updateflowerService = async (id, flowerData) => {
    return await prisma.flower.update({
        where: {flower_id:id},  // ID ของ flower ที่ต้องการอัพเดต 
        data: flowerData,
    });
}

export const deleteFlowerService = async (id) => {
    return await prisma.flower.delete({
        where: { flower_id: id }, // ID ของ flower ที่ต้องการลบ
    });
}