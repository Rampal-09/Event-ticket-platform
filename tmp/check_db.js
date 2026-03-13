const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    try {
        const event = await prisma.event.findUnique({
            where: { id: 17 },
            include: {
                eventimage: true,
                promocode: true,
                eventschedule: true
            }
        });
        console.log("EVENT DATA:");
        console.log(JSON.stringify(event, null, 2));
        console.log("TYPES:");
        console.log("tags type:", typeof event.tags);
        console.log("highlights type:", typeof event.highlights);
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

check();
