const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');
const { readFile } = require('fs/promises');


// server
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded ({ extended : true }));
app.use(express.json());

// HTML Routes
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// GET request for API route
app.get('/api/notes', function (req, res) {
});

// App listening on PORT
app.listen(PORT, function() {
    console.log(`The app is now listening on PORT ${PORT}`);
});