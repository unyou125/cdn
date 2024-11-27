const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.static("public"));

// Serve files list
app.get("/files", (req, res) => {
    fs.readdir(path.join(__dirname, "uploads"), (err, files) => {
        if (err) return res.status(500).send("Error reading files.");
        res.json(files);
    });
});

// Upload file
app.post("/upload", upload.single("file"), (req, res) => {
    res.status(200).send("File uploaded successfully!");
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
