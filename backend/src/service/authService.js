import prisma from "../prismaClient.js";

export const registerService = async (userData) => {
    return await prisma.customer.create({
        data: userData,
    });

}

export const getUserByEmail = async (email) => {   //login
    return await prisma.customer.findUnique({
        where: {
            email: email,
        },
    });
};
