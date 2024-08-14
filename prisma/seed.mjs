import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();
async function main() {
  const numProducts = 10000;
  const products = Array.from({ length: numProducts }, () => ({
    title: faker.commerce.productName(),
    price: parseInt(faker.commerce.price({ min: 100, max: 100000 })),
    describe: faker.commerce.productDescription(),
    category: faker.commerce.department(),
  }));
  await prisma.products.upsertMany({
    data: products,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
