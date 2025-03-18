import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import user from "./routes/user.js";
import place from "./routes/place.js";
import reset from "./routes/reset.js";
import multer from "multer";
import { pool } from './database/database.js'; // MySQL connection pool
import cloudinary from './utils/CloudinaryConfig.js'; // Cloudinary configuration
import streamifier from "streamifier";

const app = express();
const port = 8080;

// Start the server
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

// Middleware setup
app.use(bodyParser.json());
app.use(cors({
  origin: "*", // Allow all origins for CORS
  methods: ["GET", "POST", "PUT"],
  allowedHeaders: ["Content-Type"]
}));

// Logging middleware
const myLogger = (req, res, next) => {
  console.log("Calling API...");
  next();
  console.log("API call completed");
};

app.use(myLogger);

// Routes
app.use("/user", user);
app.use("/place", place);
app.use("/reset", reset);

// Multer configuration to store photos in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint to handle photo upload
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // Ensure the file is available
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    // Ensure user_id is provided
    if (!req.body.user_id) {
      return res.status(400).send("User ID is required.");
    }

    // Validate file type and size
    const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
    const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif"];

    if (!ALLOWED_TYPES.includes(req.file.mimetype)) {
      return res.status(400).send("Only image files are allowed.");
    }

    if (req.file.size > MAX_SIZE) {
      return res.status(400).send("File size exceeds the limit of 5MB.");
    }

    // Upload the image to Cloudinary
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      { resource_type: "auto" },
      async (error, result) => {
        if (error) {
          console.error("Error uploading image to Cloudinary:", error);
          return res.status(500).send("Error uploading image to Cloudinary");
        }

        // Ensure Cloudinary returned a result
        if (!result || !result.secure_url) {
          console.error("No secure URL returned by Cloudinary");
          return res.status(500).send("Error: No image URL returned by Cloudinary");
        }

        const imageUrl = result.secure_url; // URL returned from Cloudinary
        console.log("Image uploaded to Cloudinary:", imageUrl);

        // Store the image URL and user_id in the MySQL database using the pool
        pool.query("INSERT INTO photos (user_id, url) VALUES (?, ?)", [req.body.user_id, imageUrl], (err, result) => {
          if (err) {
            console.error("Error inserting into database:", err);
            return res.status(500).send("Error storing image URL and user_id in database");
          }
          console.log("Image URL and user_id stored in database");

          // Send the response with the image URL
          res.json({ imageUrl });
        });
      }
    );

    // Stream the file to Cloudinary
    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (error) {
    console.error("Error in /upload endpoint:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Fetch the profile photo for a given user_id
app.get("/user/:id/photo", (req, res) => {
  const userId = req.params.id;

  const query = "SELECT url FROM photos WHERE user_id = ?";
  pool.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching photo from database:", err);
      return res.status(500).send("Error fetching photo");
    }

    if (results.length === 0) {
      return res.status(404).send("No photo found for this user");
    }

    const photoUrl = results[0].url;
    res.json({ photoUrl });
  });
});

export default app;
