import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ErrorEntryItem {
    id: number;
    errorQuery: string;
    whyItHappens: string;
    howToAvoid: string;
    solutionSteps: string;
    command: string | null;
    youtubeCode: string | null;
}

function findFallbackError(query: string): ErrorEntryItem | null {
    try {
        const filePath = path.join(process.cwd(), 'errors-export.json');
        if (fs.existsSync(filePath)) {
            const rawData = fs.readFileSync(filePath, 'utf-8');
            const parsed = JSON.parse(rawData);
            if (Array.isArray(parsed)) {
                const lowerQ = query.toLowerCase().trim();
                const exact = parsed.find((item: any) => item.errorQuery.toLowerCase() === lowerQ);
                if (exact) return exact;
                const partial = parsed.find((item: any) => item.errorQuery.toLowerCase().includes(lowerQ));
                if (partial) return partial;
            }
        }
    } catch (err) {
        console.error("Fallback error search failed:", err);
    }
    return null;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');

    if (!q) {
        return NextResponse.json({ error: "No query provided" }, { status: 400 });
    }

    let errorResult: ErrorEntryItem | null = null;

    try {
        const results = await prisma.$queryRaw<Array<ErrorEntryItem>>`
            SELECT * FROM "ErrorEntry"
            WHERE "errorQuery" ILIKE ${'%' + q + '%'}
            LIMIT 1
        `;
        errorResult = results[0] || null;
    } catch (error: any) {
        console.error("Database error in api/errors, trying fallback:", error);
    }

    if (!errorResult) {
        errorResult = findFallbackError(q);
    }

    if (errorResult) {
        const apiKey = process.env.YOUTUBE_API_KEY;
        if (apiKey && !errorResult.youtubeCode) {
            try {
                const ytQuery = encodeURIComponent(`python ${errorResult.errorQuery} tutorial`);
                const ytRes = await fetch(
                    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${ytQuery}&type=video&key=${apiKey}`
                );
                const ytData = await ytRes.json();
                if (ytData.items && ytData.items.length > 0) {
                    errorResult.youtubeCode = ytData.items[0].id.videoId;
                }
            } catch (ytErr) {
                console.error("YouTube API error:", ytErr);
            }
        }
        return NextResponse.json(errorResult);
    } else {
        return NextResponse.json({ notFound: true, message: "We haven't seen this error yet. Double check your spelling or submit a request!" });
    }
}


