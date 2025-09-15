const multer = require("multer");
const path = require("path");

// Using memory storage for serverless environments
const storage = multer.memoryStorage();

// File filter to validate file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const mimetype = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error("Error: File upload only supports the following filetypes - " + allowedTypes));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
});

// In a real-world serverless app, you would add middleware after this
// to upload the file(s) from req.file(s).buffer to a cloud storage provider
// like Cloudinary, AWS S3, or Google Cloud Storage.

module.exports = upload;
