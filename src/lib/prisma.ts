import { PrismaClient } from "@prisma/client";

/**
 * Singleton Prisma : évite la création de multiples instances en dev
 * (Next.js recharge les modules à chaud, ce qui épuiserait les connexions DB sans ce pattern).
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
