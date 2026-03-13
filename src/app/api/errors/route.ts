import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');

    if (!q) {
        return NextResponse.json({ error: "No query provided" }, { status: 400 });
    }

    try {
        // Basic partial match search for demonstration purposes
        const errorResult = await prisma.errorEntry.findFirst({
            where: {
                errorQuery: {
                    contains: q,
                }
            }
        });

        if (errorResult) {
            // Check if we should fetch dynamically from Youtube
            const apiKey = process.env.YOUTUBE_API_KEY;
            if (apiKey) {
                try {
                    // Add 'python' to query to ensure relevant results
                    const ytQuery = encodeURIComponent(`python ${errorResult.errorQuery} tutorial`);
                    const ytRes = await fetch(
                        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${ytQuery}&type=video&key=${apiKey}`
                    );
                    const ytData = await ytRes.json();

                    if (ytData.items && ytData.items.length > 0) {
                        // Override the seeded mock video ID with the real dynamic one
                        errorResult.youtubeCode = ytData.items[0].id.videoId;
                    }
                } catch (ytErr) {
                    console.error("YouTube API error:", ytErr);
                    // Fallback to the seeded code on error, no action needed
                }
            }

            return NextResponse.json(errorResult);
        } else {
            return NextResponse.json({ notFound: true, message: "We haven't seen this error yet. Double check your spelling or submit a request!" });
        }
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
