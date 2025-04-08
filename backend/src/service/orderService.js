import prisma from "../prismaClient.js";

export const createOrderService = async (orderData) => {
    return await prisma.order.create({  // สร้าง order ใหม่ในฐานข้อมูล
        data: orderData,
    });
}