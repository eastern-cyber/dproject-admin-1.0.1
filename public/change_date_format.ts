const fs = require("fs");

// Function to convert date from "Feb 15, 2025" format to "dd/mm/yyyy"
function convertDateFormat(dateStr) {
  const dateObj = new Date(dateStr); // Convert string to Date object
  if (isNaN(dateObj)) {
    console.error(`Invalid date format: ${dateStr}`);
    return dateStr; // If the date is invalid, return the original string
  }

  // Format date to dd/mm/yyyy
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = dateObj.getFullYear();

  return `${day}/${month}/${year}`;
}

// Load the JSON file
fs.readFile("dproject-users.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  // Parse the JSON data
  let users;
  try {
    users = JSON.parse(data);
  } catch (parseError) {
    console.error("Error parsing JSON:", parseError);
    return;
  }

  // Update the "userCreated" field for each record
  users = users.map((user) => {
    if (user.userCreated) {
      user.userCreated = convertDateFormat(user.userCreated);
    }
    return user;
  });

  // Save the updated data to output.json
  fs.writeFile("output.json", JSON.stringify(users, null, 2), "utf8", (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      return;
    }
    console.log("Updated data saved as output.json");
  });
});
