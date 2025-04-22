import prisma from "../prismaClient.js";

export const registerService = async (userData) => {
  return await prisma.customer.create({
    data: userData,
  });
};

export const getUserByEmail = async (email) => {
  //login
  return await prisma.customer.findUnique({
    where: {
      email: email,
    },
  });
};

export const AdminOnlyService = async (email) => {
  return await prisma.customer.findUnique({
    where: {
      email: email,
    },
    select: {
      customer_id: true,
      first_name: true,
      last_name: true,
      email: true,
      role: true,
    },
  });
};
