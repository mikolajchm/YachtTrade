const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: (req, file, cb) => {
    const [name, ext] = file.originalname.split('.');
    cb(null, `${name}-${Date.now()}.${ext}`);
  }
});

const limits = {
  fileSize: 1024 * 1024 * 20
};

const imageUpload = multer({ storage, limits });

module.exports = imageUpload;