import prisma from "../prismaClient.js";

export const getAllOrderItemService = async () => {
    return await prisma.orderItem.findMany();
}
export const createOrderItemService = async (orderItemData) => {
    return await prisma.orderItem.create({
        data : orderItemData,
    });
}
export const deleteOrderItemService = async (id) => {
    return await prisma.orderItem.delete({
        where: {
            order_item_id: id,
        },
    });
}