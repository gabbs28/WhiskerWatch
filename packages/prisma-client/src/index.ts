import { PrismaClient } from './prisma-client';

// Export Prisma
export * from './prisma-client';

// Export the Prisma namespace (errors)
export * from './prisma-client/internal/prismaNamespace';

// Create a global Prisma Client
const globalForPrisma = global as unknown as {
    prisma: PrismaClient;
};

// Export a singleton instance of Prisma Client
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// Attach the singleton instance to the global object (for TypeScript and JavaScript)
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Set the default export to the singleton instance
export default prisma;
