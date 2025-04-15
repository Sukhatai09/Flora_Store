import prisma from "../prismaClient.js";

export const createflowerService = async (flowerData) => {
    return await prisma.flower.create({
        data: flowerData,
    });
}

export const getflowerByIdService = async (id) => {
    return await prisma.flower.findMany({
        where: {
            flower_id: id, // ID ของ flower ที่ต้องการค้นหา
        },
    });

}

export const getAllflowerService = async (skip,limit) => {
    return await prisma.flower.findMany({
        skip: skip,
        take: limit,
        orderBy: {
            flower_id: 'asc', // เรียงลำดับตาม flower_id
        },
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