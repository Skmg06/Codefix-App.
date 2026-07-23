import { PrismaClient } from '@prisma/client';

const databaseUrl =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_VAJBp0P8ECNo@ep-misty-morning-adtwxi3n-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
