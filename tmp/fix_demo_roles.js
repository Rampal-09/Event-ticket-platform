const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Manually fixing demo account roles...');
  try {
    const admin = await prisma.user.update({
      where: { email: 'admin@eventplatform.com' },
      data: { role: 'ADMIN' }
    });
    console.log('✅ Admin role fixed:', admin.role);

    const organizer = await prisma.user.update({
      where: { email: 'organizer@eventplatform.com' },
      data: { role: 'ORGANIZER' }
    });
    console.log('✅ Organizer role fixed:', organizer.role);
    
  } catch (err) {
    console.error('❌ Failed to update roles:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
