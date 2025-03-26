const fs = require('fs');
const path = require('path');

// Paths to files
const usersFilePath = path.join(__dirname, '../public/dproject-users.json');
const scriptFilePath = path.join(__dirname, 'ERC1155-claim-distribute.js');

// Read dproject-users.json
const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));

// Extract valid Ethereum addresses (start with "0x")
const recipients = usersData
    .map(user => user.userId)
    .filter(userId => typeof userId === 'string' && userId.startsWith('0x'));

console.log(`Found ${recipients.length} valid wallet addresses.`);

// Read the ERC1155 script
let scriptContent = fs.readFileSync(scriptFilePath, 'utf8');

// Replace RECIPIENTS array in the script
const newRecipientsArray = `const RECIPIENTS = ${JSON.stringify(recipients, null, 4)};`;
scriptContent = scriptContent.replace(/const RECIPIENTS = \[.*?\];/s, newRecipientsArray);

// Write back the updated script
fs.writeFileSync(scriptFilePath, scriptContent, 'utf8');

console.log(`Updated RECIPIENTS array in ERC1155-claim-distribute.js with ${recipients.length} addresses.`);
