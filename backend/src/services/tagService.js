import sqlite3 from "sqlite3";
import { open } from "sqlite";


export async function getTagFrequencies(x = 10, divs = [], indexes = []) {
  const db = await open({
  filename: "./codeforces.db",
  driver: sqlite3.Database,
  });


  // Find all contests that have finished
  const allContests = await db.all(
    `SELECT * FROM contests 
     WHERE phase = 'FINISHED'
     ORDER BY startTimeSeconds DESC`
  );
  console.log(allContests.length);

  const filteredContests = [];
  // If requested divs contains both Div1 and Div2 -> 1
  let contains_div1_and_div2 = 0;

  if (divs.includes("1") && divs.includes("2")) {
    contains_div1_and_div2 = 1;
  }

  console.log("Contests not needed are ->")
  // Iterate through all contests and filter based on Divisions 
  for (const contest of allContests) {
    const cDivs = JSON.parse(contest.divisions).map(String); 

    // Div1 + Div2 type of contests
    let div1_and_div2_contest = 0;
    if(divs.includes("[1,2]")){
      div1_and_div2_contest = 1;
    }


    if(divs.some(d=>(cDivs.includes(d)  && d.length === cDivs.length) || (div1_and_div2_contest === 1 && cDivs.length===2) || (d.length > 2 && cDivs[0].length === d.length))) {
      filteredContests.push(contest);
      // Div 1 and Div 2 starting at same time is kind of the same contest
      if(cDivs.length === 1 && cDivs.includes("1") && contains_div1_and_div2 === 1){
        x=x+1;
      }
    }
    else console.log(contest.name);

    if (filteredContests.length >= x) break;
  }


  let tagCounts = {};
  let problems = [];

  // Find all problems in all filtered contests
  for (const contest of filteredContests) {
    const contestProblems = await db.all(
      `SELECT * FROM problems WHERE contestId = ?`,
      [contest.id]
    );

    for (const prob of contestProblems) {
      // This is a Div1 problem repeated in Div2
      if(prob.same_as_div1 === 1 && contains_div1_and_div2 === 1) continue;

      const indexStart = prob.problemIndex[0].toUpperCase();

      // Apply index filter
      if (indexes.length > 0 && !indexes.includes(indexStart)) {
        continue;
      }

      const seenTags = new Set(); 

      const tags = JSON.parse(prob.tags);

      for (const tag of tags) {
        if (tag === "*special") continue; 
        

        if (!seenTags.has(tag)) {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          seenTags.add(tag);
        }
      }

      problems.push({
        contestId: contest.id,
        contestName: contest.name,
        index: prob.problemIndex,
        name: prob.name,
        tags,
      });
    }
  }

  //Sort tags according to frequency 
  const arrayTagCounts = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);

  await db.close();
  return { arrayTagCounts, problems , filteredContests};
}


