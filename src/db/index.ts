import { PrismaClient } from "@prisma/client";

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient;
}

const prisma =
    process.env.NODE_ENV === "production" || !global.prisma
        ? new PrismaClient()
        : global.prisma;

export const db = prisma;
