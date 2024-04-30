const multer = require("multer");

// Create a multer middleware function for multiple file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { files: 3 }, // Limit the maximum number of files to 3
}).any(); // Accept files attached to any field name

module.exports = { upload: upload };
