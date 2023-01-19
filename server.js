const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');

    const readFileAsync = util.promisify(fs.readFile);
    const writeFileAsync = util.promisify(fs.writeFile);

// server setup
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded ({ extended : true }));
app.use(express.json());

app.use(express.static('./public'));

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
app.get('/api/notes', (req, res) => {
    fs.sendFile(path.join(__dirname, './db/db.json'));
});

//POST request for API route
app.post('/api/notes', function (req, res) {
    const note = req.body;
    readFileAsync('./db/db.json', 'utf8').then(function(data) {
        const notes = [].concat(JSON.parse(data));
        note.id = notes.length + 1;
        notes.push(note);
        return notes;
    }).then(function(notes) {
        writeFileAsync('./db/db.json', JSON.stringify(notes));
        res.json(note);
    })
});

// App listening on PORT
app.listen(PORT, function() {
    console.log(`The app is now listening on PORT ${PORT}`);
});