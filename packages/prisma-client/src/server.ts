// // Import client
// import { PrismaClient } from './prisma-client/cjs';
//
// // Import errors
// import {
//     PrismaClientKnownRequestError,
//     PrismaClientUnknownRequestError,
//     PrismaClientRustPanicError,
//     PrismaClientInitializationError,
//     PrismaClientValidationError,
// } from '@prisma/client/runtime/library';
//
// // Export errors
// export {
//     PrismaClientKnownRequestError,
//     PrismaClientUnknownRequestError,
//     PrismaClientRustPanicError,
//     PrismaClientInitializationError,
//     PrismaClientValidationError,
// };
//
// // Create a global Prisma Client
// const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };
//
// // Wrap prisma creation behind a singleton function
// function getPrismaClient() {
//     if (process.env.NODE_ENV === 'production') {
//         return new PrismaClient();
//     }
//
//     globalForPrisma.prisma ??= new PrismaClient();
//
//     return globalForPrisma.prisma;
// }
//
// // Export the wrapped function as "prisma"
// export const prisma = getPrismaClient();
//
// // Set the default export to the singleton instance
// export default prisma;

// Export
export const server = true;

// Default
export default server;
