import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    // เชื่อมต่อกับฐานข้อมูล
    await prisma.$connect();
    console.log("Connected to the database successfully!");

    // ทำการดำเนินการกับฐานข้อมูลที่นี่
  } catch (error) {
    console.error("Error interacting with the database:", error);
  } finally {
    // ปิดการเชื่อมต่อกับฐานข้อมูล
    await prisma.$disconnect();
  }
}

main();

export default prisma;
