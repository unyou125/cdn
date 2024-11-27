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
        const fileData = files.map(file => ({
            name: file,
            url: `/uploads/${file}`,
        }));
        res.json(fileData);
    });
});

// Handle file uploads
app.post("/upload", upload.single("file"), (req, res) => {
    res.status(200).send("File uploaded successfully!");
});

// Handle file deletion
app.delete("/delete/:fileName", (req, res) => {
    const filePath = path.join(__dirname, "public/uploads", req.params.fileName);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        res.status(200).send("File deleted successfully!");
    } else {
        res.status(404).send("File not found!");
    }
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
