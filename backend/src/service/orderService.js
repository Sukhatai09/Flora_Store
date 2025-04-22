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
  await prisma.orderItem.deleteMany({
    where: {
      order_id: id,
    },
  });

  return await prisma.order.delete({
    where: {
      order_id: id,
    },
  });
};

export const updateOrderService = async (id, status) => {
    return await prisma.order.update({
        where: {
        order_id: id,
        },
        data: {
        status: status,
        },
    });
}
