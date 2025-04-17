import prisma from "../prismaClient.js";

export const getcartservice = async () => {
    return await prisma.cart.findMany(

    )

}

export const createcartservice = async (customer_id) => {
    return await prisma.cart.create({
        data: {
            customer_id,
        }
    })

}

export const deletecartservice = async (customer_id) => {
    return await prisma.cart.deleteMany({
        where: {
            customer_id: customer_id
        }
    })
}