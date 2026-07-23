import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function getFallbackErrors() {
    try {
        const filePath = path.join(process.cwd(), 'errors-export.json');
        if (fs.existsSync(filePath)) {
            const rawData = fs.readFileSync(filePath, 'utf-8');
            const parsed = JSON.parse(rawData);
            if (Array.isArray(parsed)) {
                return parsed
                    .map((item: any) => ({
                        id: item.id,
                        errorQuery: item.errorQuery
                    }))
                    .sort((a, b) => a.errorQuery.localeCompare(b.errorQuery));
            }
        }
    } catch (err) {
        console.error("Fallback file read failed:", err);
    }
    return [];
}

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

        if (Array.isArray(errors) && errors.length > 0) {
            return NextResponse.json(errors);
        }
    } catch (error: any) {
        console.error("Database error in all-errors, attempting fallback:", error);
    }

    // Fallback to local JSON export if DB query fails or returns 0 records
    const fallbackData = getFallbackErrors();
    return NextResponse.json(fallbackData);
}


