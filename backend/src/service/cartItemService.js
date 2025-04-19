import prisma from "../prismaClient.js";

export const getcartItemService = async () => {
    return await prisma.cartItem.findMany()
}
export const createcartItemService = async (cartItem) => {
    return await prisma.cartItem.create({
        data: cartItem
    })
}


export const deletecartItemService = async (cart_item_id) => {
    return await prisma.cartItem.delete({
        where: { cart_item_id: cart_item_id }
    });
}