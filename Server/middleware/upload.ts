import multer from "multer";
import path from "path";

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/"); // Destination folder
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${path.parse(file.originalname).name}${path.extname(
        file.originalname
      )}` // Generating filename
    );
  },
});

// Initialize multer with the storage configuration.
const upload = multer({ storage: storage });

export default upload;
