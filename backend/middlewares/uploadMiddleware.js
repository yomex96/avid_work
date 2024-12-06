// import multer from 'multer';

// const storage = multer.memoryStorage(); // Store files in memory
// const upload = multer({
//     storage,
//     limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
//     fileFilter: (req, file, cb) => {
//         const filetypes = /jpeg|jpg|png|gif|mp4/; // Allowed file types
//         const mimetype = filetypes.test(file.mimetype);
//         const extname = filetypes.test(file.originalname.split('.').pop().toLowerCase());

//         if (mimetype && extname) {
//             return cb(null, true);
//         }
//         cb(new Error('Only images and videos are allowed!'));
//     },
// });

// export const uploadMiddleware = upload.single('file'); // 'file' is the field name
