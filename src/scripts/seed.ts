const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Trousers" },
        { name: "T-shirts" },
        { name: "Shirts" },
        { name: "Shoes" },
        { name: "Thermos" },
        { name: "Hat" },
        { name: "Perfume" },
      ],
    });
    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
