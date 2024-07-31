import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const resultPublished = await prisma.config.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      key: "resultPublished",
      value: false,
    },
  });

  const shortlistPublished = await prisma.config.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      key: "shortlistPublished",
      value: false,
    },
  });

  const acceptApplication = await prisma.config.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      key: "acceptApplication",
      value: true,
    },
  });

  console.log({ resultPublished, shortlistPublished, acceptApplication });
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
