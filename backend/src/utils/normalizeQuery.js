export function normalizeQuery(query) {
    try {
        // default values
        let x = parseInt(query.x);
        if (isNaN(x) || x <= 0) {
            x = 10;
        }
       

        const allowedDivs = ["1", "2", "3", "4", "educational", "other", "1_2"];
        let divs = [];
        if (query.divs) {
            divs = query.divs
            .split(",")
            .map(d => d.trim())
            .filter(d => allowedDivs.includes(d))
            .map(d => (d === "1_2" ? "[1,2]" : d));
        }
        

        const allowedIndices = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
        let indexes = [];
        if (query.indexes) {
            indexes = query.indexes
            .split(",")
            .map(i => i.trim().toUpperCase())
            .filter(i => allowedIndices.includes(i));
        }

        if (divs.length===0) {
            divs = allowedDivs;
            divs[6] = "[1,2]"; 
        }

        if (indexes.length === 0) {
            indexes = allowedIndices; 
        }
        return {x, divs, indexes};
    } 
    catch (err) {
        console.error("normalizeQuery error:", err);
        return {
            x: 10, 
            divs: ["1", "2", "3", "4", "educational", "other", "[1,2]"], 
            indexes: [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"] 
        }
    }
}




