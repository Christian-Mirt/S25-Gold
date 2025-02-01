const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'productive-places' folder (including assets like JS and CSS)
app.use(express.static(path.join(__dirname, '../productive-places')));

// Catch-all route to send the index.html file for any other route (404s)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../productive-places', 'index.html'));
});

app.listen(5173, () => {
    console.log("App listening on port 5173");
});
