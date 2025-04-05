import prisma from "../prismaClient.js";

export const registerService = async (userData) => {
    return await prisma.customer.create({
        data: userData,
    });

}