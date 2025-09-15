const multer = require("multer");
const path = require("path");

// Using memory storage for serverless environments
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const mimetype = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
};

const uploadAvatar = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 2 }, // 2MB file size limit
}).single("avatar");

// In a real-world serverless app, you would add middleware after this
// to upload the file from req.file.buffer to a cloud storage provider
// like Cloudinary, AWS S3, or Google Cloud Storage.

module.exports = uploadAvatar;
