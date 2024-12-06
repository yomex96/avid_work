// import multer from 'multer';

// const storage = multer.memoryStorage(); // Use memory storage to directly send files to S3
// const upload = multer({ storage });

// export default upload;

import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;






// import multer from 'multer';
// import path from 'path';

// // Set up storage engine
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     let dir = '';
//     if (req.body.category === 'prewedding') dir = 'uploads/prewedding/';
//     else if (req.body.category === 'brand') dir = 'uploads/brand/';
//     else if (req.body.category === 'lifestyle') dir = 'uploads/lifestyle/';
    
//     cb(null, dir);
//   },
//   filename: (req, file, cb) => {
//     const customName = req.body.customName || Date.now();
//     cb(null, `${customName}${path.extname(file.originalname)}`);
//   },
// });

// // Initialize upload
// const upload = multer({ storage });

// export default upload;


