import { prisma } from '../src';
import * as bcrypt from 'bcrypt';

async function main() {
    // Write your seed data here
    await prisma.users.create({
        data: {
            email: 'test@example.com',
            first_name: 'Test',
            last_name: 'User',
            username: 'test',
            password_hash: bcrypt.hashSync('Password123!', 10),
        },
    });

    // Log seeding is complete
    console.log('Seeding completed');
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
