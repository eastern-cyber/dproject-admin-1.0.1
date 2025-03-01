const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'dproject-users.json');

try {
    // Read the JSON file
    const data = fs.readFileSync(filePath, 'utf-8');
    let users = JSON.parse(data);

    // Update records that don't have the "userCreated" field or have an empty value
    users = users.map(user => {
        if (!user.hasOwnProperty('userCreated')) {
            user.userCreated = ""; // Adding empty value
        }
        if (user.userCreated === "") {
            user.userCreated = "Jan 01, 2025"; // Updating empty values
        }
        return user;
    });

    // Write updated data back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
    console.log('Successfully updated dproject-users.json');
} catch (error) {
    console.error('Error updating the file:', error);
}

