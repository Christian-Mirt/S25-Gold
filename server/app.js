import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import user from "./routes/user.js";
import place from "./routes/place.js";
import multer from 'multer';
import cloudinary from './utils/CloudinaryConfig.js';  // Importing Cloudinary configuration
import streamifier from 'streamifier';

const app = express();
const port = 8080;

const myLogger = function (req, res, next) {
    console.log("Calling Api");
    next();
    console.log("Api calling has done");
};

app.use(myLogger);
app.use(bodyParser.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Content-Type']
}));

app.use('/user', user);
app.use('/place', place);

// Multer configuration to store photos in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint to handle photo upload
app.post('/api/upload', upload.single('photo'), (req, res) => {
  if (!req.file) {
    console.log('No photo uploaded');  // Log if no file is uploaded
    return res.status(400).send('No photo uploaded');
  }

  const fileBuffer = req.file.buffer;

  const stream = cloudinary.uploader.upload_stream(
    { resource_type: 'auto' }, // Auto detects file type (image, video, etc.)
    (error, result) => {
      if (error) {
        console.error('Cloudinary upload error:', error); // Log Cloudinary error
        return res.status(500).send('Error uploading to Cloudinary');
      }
      console.log('Cloudinary upload result:', result); // Log the result for success
      res.json({ url: result.secure_url });
    }
  );

  // Convert the file buffer into a readable stream for Cloudinary
  streamifier.createReadStream(fileBuffer).pipe(stream);
});

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});

export default app;
