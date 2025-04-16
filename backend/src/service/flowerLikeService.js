import prisma from "../prismaClient.js";

export const getFlowerLikeService = async () => {
    return await prisma.flowerLike.findMany()
}

export const getFlowerLikeByCustomerIdService = async (customer_id) => {
    return await prisma.flowerLike.findMany({
        where: {
            customer_id: customer_id
        }
    })
}

export const createFlowerLikeService = async (data) => {
    return await prisma.flowerLike.create({
        data: data
    })
}

export const deleteFlowerLikeService = async (customer_id,flower_id) => {
    return await prisma.flowerLike.deleteMany({
        where: {
            customer_id: customer_id,
            flower_id: flower_id
        }
    })
}