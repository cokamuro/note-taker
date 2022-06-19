const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3001;

app.use(express.static("public"));

//adding the GET * route for index.html
app.get("*", (req, res) => 
    res.sendFile(path.join(__dirname, "public/index.html"))
);

//adding the GET /notes route for notes.html
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

//adding the GET /api/notes route for the db.json file contents
app.get("/api/notes", (req, res) =>
  res.json(readDB())
);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);


const writeToFile = (filename, data) => {
    // function to write text file, given a filename and the string contents
    fs.writeFile(filename, data, (err) => {
        if (err) console.log(err);
    });
};

const readDB = () => {
    // function to read the template HTML from disk
    return JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
};