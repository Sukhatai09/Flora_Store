import prisma from "../prismaClient.js";

export const createOrderService = async (orderData) => {
  return await prisma.order.create({
    // สร้าง order ใหม่ในฐานข้อมูล
    data: orderData,
  });
};

export const getAllOrdersService = async () => {
    
  return await prisma.order.findMany({
    include: {
      OrderItems: true, // ✅ ต้องตรงกับชื่อ field ใน schema (เคารพ case-sensitive ด้วย!)
    },
  });
};

export const deleteOrderService = async (id) => {
  return await prisma.order.delete({
    // ลบ order ตาม id ที่ส่งมา
    where: {
        order_id: id,
    },
  });
};
