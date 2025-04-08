import prisma from "../prismaClient.js";

export const getAllOrderItemService = async () => {
    return await prisma.orderItem.findMany();
}
export const createOrderItemService = async (orderItemData) => {
    return await prisma.orderItem.create({
        data : orderItemData,
    });
}