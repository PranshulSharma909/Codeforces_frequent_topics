import fetch from 'node-fetch';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';



// Function to find Division of contest 
function getContestDivs(contestName) {
    const divs = [];
    const lowerName = contestName.toLowerCase().replace(/\s/g, '');

    if (lowerName.includes("educational")) {
        divs.push("educational");
    } else if (lowerName.includes("div.1") && lowerName.includes("div.2")) {
        divs.push(1, 2);
    } else if (lowerName.includes("div.1")) {
        divs.push(1);
    } else if (lowerName.includes("div.2")) {
        divs.push(2);
    } else if (lowerName.includes("div.3")) {
        divs.push(3);
    } else if (lowerName.includes("div.4")) {
        divs.push(4);
    }

    if (divs.length === 0) {
        divs.push("other");
    }
    return divs;
}



// timeout considering cf's api rate limit
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



export async function syncContests() {
    console.log("Starting syncing contests ...");

    const db = await open({
        filename: './codeforces.db',
        driver: sqlite3.Database
    });

    // in case the tables have not been created yet
    await db.exec(`
        CREATE TABLE IF NOT EXISTS contests (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            type TEXT,
            phase TEXT,
            startTimeSeconds INTEGER,
            divisions TEXT
        );
        CREATE TABLE IF NOT EXISTS problems (
            contestId INTEGER,
            name TEXT NOT NULL,
            problemIndex TEXT,
            tags TEXT,
            divisions TEXT,
            same_as_div1 INTEGER,
            FOREIGN KEY (contestId) REFERENCES contests (id),
            PRIMARY KEY (contestId, problemIndex)
        );
    `);


    // Find the latest contest and check only those contests which could've been updated
    const lastContest = await db.get('SELECT MAX(startTimeSeconds) as maxStartTime FROM contests WHERE phase = "FINISHED"');
    const lastContestTime = lastContest?.maxStartTime - 604800 || 0;            // 1 week as a buffer


    const contestRes = await fetch("https://codeforces.com/api/contest.list");
    const contestData = await contestRes.json();
    if (contestData.status !== "OK") throw new Error("Failed to fetch contests at this moment");
    
    //Filter by time and then find unique contests for surety 
    const newContests = contestData.result.filter(contest => contest.startTimeSeconds > lastContestTime);
    const uniqueNewContests = Array.from(new Map(newContests.map(c => [c.id, c])).values());

    if (uniqueNewContests.length === 0) {
        console.log("No new contests to add!!");
        await db.close();
        return;
    }

    console.log(`Found ${uniqueNewContests.length} new contests to add!!`);


    //For every contest, enter it and its problems into database
    for(const contest of uniqueNewContests){
        try {
            const divisions = getContestDivs(contest.name);
            if (contest.phase !== 'FINISHED') continue;

            await db.run(
                'INSERT OR IGNORE INTO contests (id, name, type, phase, startTimeSeconds, divisions) VALUES (?, ?, ?, ?, ?, ?)',
                contest.id, contest.name, contest.type, contest.phase, contest.startTimeSeconds, JSON.stringify(divisions)
            );



            const probRes = await fetch(`https://codeforces.com/api/contest.standings?contestId=${contest.id}&from=1&count=1`);
            const probData = await probRes.json();
            if (probData.status !== "OK") {
                console.warn(`Skipping problems for contest ${contest.id}: ${probData.comment}`);
                continue;
            }

            for (const prob of probData.result.problems) {
                await db.run(
                    `INSERT INTO problems (contestId, problemIndex, name, tags, divisions, same_as_div1)
                    VALUES (?, ?, ?, ?, ?, ?)
                    ON CONFLICT(contestId, problemIndex) DO UPDATE SET
                        name = excluded.name,
                        tags = excluded.tags,
                        divisions = excluded.divisions,
                        same_as_div1 = excluded.same_as_div1`,
                    [contest.id, prob.index, prob.name, JSON.stringify(prob.tags), JSON.stringify(divisions), 0]
                );
            }

            console.log(`Successfully synced contest: ${contest.name} [Divisions: ${divisions.join(', ')}]`);
            await sleep(800);
        } catch(err){
            console.error(`Error syncing contest ${contest.id}:`, err);
        }
    }

    console.log("Syncing completed!!");

    
    // Finding overlapping problems in Div1 and Div2 contests
    const problemsUpdated = await db.run(`
        UPDATE problems
        SET same_as_div1 = 1
        WHERE
            problems.divisions = '[2]' AND
            EXISTS (
                SELECT 1
                FROM problems p2
                JOIN contests c1 ON problems.contestId = c1.id
                JOIN contests c2 ON p2.contestId = c2.id
                WHERE
                    problems.name = p2.name
                    AND c1.startTimeSeconds = c2.startTimeSeconds
                    AND problems.contestId != p2.contestId
            )
    `);

    console.log(`Updated ${problemsUpdated.changes} problems to mark them as overlapping with Div. 1.`);
    await db.close();
}


syncContests();
