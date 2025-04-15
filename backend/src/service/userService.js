import prisma from "../prismaClient.js";

export const getUserByIdService = async (userId) => {
  return await prisma.customer.findUnique({
    // ค้นหา user โดยใช้ userId
    where: { customer_id: userId },
    include: { Orders: true, FlowerLikes: true }, // รวมข้อมูล orders ที่เกี่ยวข้องกับ user
  });
};

export const updateUserService = async (userId, data) => {
  return await prisma.customer.update({
    where: { customer_id: userId }, // ค้นหา user โดยใช้ userId
    data: data, // อัพเดทข้อมูลของ user
  });
};
