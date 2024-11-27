const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();

// Set up Multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, "public/uploads");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

// Serve static files
app.use(express.static("public"));

// Get a list of uploaded files
app.get("/files", (req, res) => {
    const uploadDir = path.join(__dirname, "public/uploads");
    fs.readdir(uploadDir, (err, files) => {
        if (err) return res.status(500).send("Error reading files.");
        const fileUrls = files.map(file => `/uploads/${file}`);
        res.json(fileUrls);
    });
});

// Handle file uploads
