
const fs = require("fs");

// Load JSON files
const sourceData = JSON.parse(fs.readFileSync("source.json", "utf8"));
const targetData = JSON.parse(fs.readFileSync("target.json", "utf8"));

// Convert "block_timestamp" to Date for sorting
sourceData.forEach((entry) => {
  entry.parsedTimestamp = new Date(entry.block_timestamp.split(", ").reverse().join(" ")); // Convert "dd/mm/yyyy, HH:MM:SS" to Date object
});

// Create a map of userId to the oldest block_timestamp from source.json
const sourceMap = sourceData.reduce((acc, entry) => {
  const { userId, block_timestamp, parsedTimestamp } = entry;
  if (!acc[userId] || parsedTimestamp < acc[userId].parsedTimestamp) {
    acc[userId] = { block_timestamp, parsedTimestamp };
  }
  return acc;
}, {});

// Update target.json with "planA"
const updatedTarget = targetData.map((entry) => ({
  ...entry,
  planA: sourceMap[entry.userId]?.block_timestamp || "", // Add the matched timestamp or empty string
}));

// Save output to a new JSON file
fs.writeFileSync("output.json", JSON.stringify(updatedTarget, null, 2), "utf8");

console.log("Updated JSON saved as output.json");

