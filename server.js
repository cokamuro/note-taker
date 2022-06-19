const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//adding the GET /notes route for notes.html
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "public/notes.html")));

//adding the GET /api/notes route for the db.json file contents
app.get("/api/notes", (req, res) => res.json(readDB()));

//adding the GET /api/notes route for the db.json file contents
// app.get("/api/notes/:id", (req, res) => {
//     console.log("!!!!",req)
//     const requestedID = req.params.id;
//     console.log("get('/api/notes/:id'",requestedID)
// });

//adding the DELETE /api/notes route for the db.json file contents
app.delete("/api/notes/:id", (req, res) => removeNoteFromDbById(req.params.id));

//adding the POST /api/notes route for the db.json file contents
app.post("/api/notes", (req, res) => saveNoteToDB(req.body))

//adding the GET * route for index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
});

app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);

const removeNoteFromDbById = (id) => {
    const notes = readDB();
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].id == id) {
            notes.splice(i, 1);
            break;
        }
    }
    saveDB(notes);
};

const saveDB = (notes) => {
    fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
        if (err) console.log(err);
    });
}

const saveNoteToDB = (note) => {
    note.id = new Date().valueOf();
    const dbContents = readDB();
    dbContents.push(note)
    saveDB(dbContents);
}

const readDB = () => {
    // function to read the JSON file and return a JSON array
    const fileContents = fs.readFileSync("./db/db.json", "utf8");
    if (fileContents != "[]") {
        const db = JSON.parse(fileContents)
        //check to see if it's an array
        if (Array.isArray(db)) {
            return db;
        } else {
            //if not, create an array and push the single item in
            const ret = [];
            ret.push(db);
            return ret;
        }
    } else {
        //if the file is empty, return an empty array
        const ret = [];
        return ret;
    }
};