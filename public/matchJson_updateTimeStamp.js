const fs = require("fs");

// Load JSON files
const sourceData = JSON.parse(fs.readFileSync("source.json", "utf8"));
const targetData = JSON.parse(fs.readFileSync("target.json", "utf8"));

// Function to parse "dd/mm/yyyy, HH:MM:SS" correctly
const parseDate = (timestamp) => {
  const [date, time] = timestamp.split(", "); // Split into ["dd/mm/yyyy", "HH:MM:SS"]
  const [day, month, year] = date.split("/"); // Extract day, month, year
  return new Date(`${year}-${month}-${day}T${time}`); // Format to "yyyy-mm-ddTHH:MM:SS"
};

// Create a map of userId to the **oldest** block_timestamp
const sourceMap = sourceData.reduce((acc, entry) => {
  const { userId, block_timestamp } = entry;
  const parsedTimestamp = parseDate(block_timestamp);

  // Store the oldest timestamp for each userId
  if (!acc[userId] || parsedTimestamp < acc[userId].parsedTimestamp) {
    acc[userId] = { block_timestamp, parsedTimestamp };
  }

  return acc;
}, {});

// Update target.json by adding "planA"
const updatedTarget = targetData.map((entry) => ({
  ...entry,
  planA: sourceMap[entry.userId]?.block_timestamp || "", // Add matching timestamp or empty string
}));

// Save output to a new JSON file
fs.writeFileSync("output.json", JSON.stringify(updatedTarget, null, 2), "utf8");

console.log("Updated JSON saved as output.json");

