const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
    const organizer = await prisma.user.findFirst({ where: { role: 'ORGANIZER' } });
    console.log('Admin User:', JSON.stringify(admin, null, 2));
    console.log('Organizer User:', JSON.stringify(organizer, null, 2));
    await prisma.$disconnect();
}

main();
