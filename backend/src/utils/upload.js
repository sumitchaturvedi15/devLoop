// const multer = require("multer");
// const path = require("path");
// const { fileURLToPath } = require("url");

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../uploads'));
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, `${Date.now()}-${file.fieldname}${ext}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png/;
//   const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase()) &&
//                   allowedTypes.test(file.mimetype);
//   isValid ? cb(null, true) : cb(new Error('Only .jpg, .jpeg or .png allowed'));
// };

// module.exports = multer({storage, fileFilter});