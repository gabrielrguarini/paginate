"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function getProducts(page: number, take: number) {
  if (page < 1) {
    page = 1;
  }
  const products = await prisma.products.findMany({
    skip: (page - 1) * take,
    take,
  });

  const totalProducts = await prisma.products.count();

  return { products, totalProducts };
}
