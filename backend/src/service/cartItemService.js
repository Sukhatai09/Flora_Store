import prisma from "../prismaClient.js";

export const getcartItemService = async () => {
    return await prisma.cartItem.findMany()
}
export const createcartItemService = async (cartItem) => {
    return await prisma.cartItem.create({
        data: cartItem
    })
}