const express = require("express");
const multer = require("multer");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json()); 

mongoose.connect("mongodb://localhost:27017/fileUploads", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, 
}).single("picture");

app.post("/submit", (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "File upload failed", error: err });
    }
    if (!req.file) {
      return res.status(400).json({ message: "No file selected" });
    }

    const { name, email } = req.body;
    const picturePath = `/uploads/${req.file.filename}`;

    try {
      const newUser = new User({ name, email, picture: picturePath });
      await newUser.save();
      res.json({ message: "User data submitted successfully", user: newUser });
    } catch (dbError) {
      res
        .status(500)
        .json({ message: "Error saving user to DB", error: dbError });
    }
  });
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the User API" });
});

// Serve static files from uploads
app.use("/uploads", express.static("uploads"));

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
