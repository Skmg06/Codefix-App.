// Seed script: Read from errors-export.json and insert into Neon PostgreSQL
import { readFileSync } from 'fs';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { Client } = require('pg');

const errors = JSON.parse(readFileSync('./errors-export.json', 'utf-8'));

const dbUrl = process.env.DATABASE_URL || "postgresql://neondb_owner:npg_VAJBp0P8ECNo@ep-misty-morning-adtwxi3n-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require";

const client = new Client({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false }
});

async function seed() {
    await client.connect();
    console.log('Connected to Neon PostgreSQL. Seeding...');

    let count = 0;
    for (const row of errors) {
        await client.query(
            `INSERT INTO "ErrorEntry" ("errorQuery", "whyItHappens", "howToAvoid", "solutionSteps", "command", "youtubeCode", "createdAt")
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       ON CONFLICT ("errorQuery") DO UPDATE SET
         "whyItHappens" = EXCLUDED."whyItHappens",
         "howToAvoid" = EXCLUDED."howToAvoid",
         "solutionSteps" = EXCLUDED."solutionSteps",
         "command" = EXCLUDED."command",
         "youtubeCode" = EXCLUDED."youtubeCode"`,
            [
                row.errorQuery,
                row.whyItHappens,
                row.howToAvoid,
                row.solutionSteps,
                row.command || null,
                row.youtubeCode || null,
            ]
        );
        count++;
        process.stdout.write(`\r  Seeded ${count}/${errors.length}: ${row.errorQuery.substring(0, 50)}`);
    }

    console.log(`\n✅ All ${count} errors now in Neon PostgreSQL!`);
    await client.end();
}

seed().catch((e) => {
    console.error('\nSeed failed:', e.message);
    process.exit(1);
});
