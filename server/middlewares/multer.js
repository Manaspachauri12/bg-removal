import multer from 'multer';

// creating multer middleware for parsing form-data

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (re,file,callback) {
    callback(null, `${Date.now()}_${file.originalname}`);
  },
});


const upload = multer({ storage });

export default upload;