const multer = require('multer');
const path = require('path');

// Configure where to save images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Images go here
  },
  filename: (req, file, cb) => {
    // Rename file to avoid duplicates: event-123456789.jpg
    cb(null, `event-${Date.now()}${path.extname(file.originalname)}`);
  }
});

// Check file type (Images only)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only images are allowed (jpeg, jpg, png, webp)!'));
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter 
});

module.exports = upload;