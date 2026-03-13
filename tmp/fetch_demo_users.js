const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.user.findMany({
      where: {
        email: {
          in: ['admin@eventplatform.com', 'organizer@eventplatform.com']
        }
      }
    });
    console.log('DEMO_USERS_FETCHED');
    console.log(JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('ERROR_FETCHING_USERS', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
