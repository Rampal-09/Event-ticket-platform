const prisma = require('../backend/src/config/db');
const bcrypt = require('bcryptjs');

async function main() {
    const adminPassword = await bcrypt.hash('admin123', 10);
    
    const admin = await prisma.user.upsert({
        where: { email: 'admin@eventplatform.com' },
        update: {},
        create: {
            email: 'admin@eventplatform.com',
            name: 'System Admin',
            password: adminPassword,
            role: 'ADMIN',
        },
    });

    console.log({ admin });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
