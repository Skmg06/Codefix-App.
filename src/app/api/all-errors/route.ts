import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const errors = await prisma.errorEntry.findMany({
            select: {
                id: true,
                errorQuery: true,
            },
            orderBy: {
                errorQuery: 'asc'
            }
        });

        return NextResponse.json(errors);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
