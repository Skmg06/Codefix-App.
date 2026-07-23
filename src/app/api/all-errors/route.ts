import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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
    } catch (error: any) {
        console.error("Database error in all-errors:", error);
        return NextResponse.json({ error: "Database error", message: error?.message || String(error) }, { status: 500 });
    }
}

