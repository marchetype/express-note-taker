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

// GET request for API route
app.get('/api/notes', (req, res) => {
    readFileAsync('./db/db.json', 'utf8').then(function(data) {
        notes = [].concat(JSON.parse(data));
        res.send(require('./db/db.json'));
    })

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
        res.send(require('./db/db.json'));
    })
});

//DELETE request for API route
// app.delete('/api/notes/:id', function(req, res) {
//     const selectedId = parseInt(req.params.id);
//     readFileAsync('./db/db.json', 'utf8').then(function(data) {
//         const notes = [].concat(JSON.parse(data));
//         const newNotes = [];
//         for (let i = 0; i < notes.length; i++) {
//             if (selectedId !== notes[i].id) {
//                 newNotes.push(notes[i]);
//             }}
//         return newNotes;
//     }).then(function(notes) {
//         writeFileAsync('./db/db.json', JSON.stringify(notes));
//         res.send(require('./db/db.json'));
//     })
// });

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

// App listening on PORT
app.listen(PORT, function() {
    console.log(`The app is now listening on PORT ${PORT}`);
});