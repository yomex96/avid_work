
import express from 'express';
import { uploadImage,  
    getImages, 
    deleteAllImages,
    getImageById,
    deleteImage,
    deleteImageByUrl,
    
     // uploadVideo,
    // deleteVideoById,
    // deleteAllVideos
        // getVideos,
         // deleteImageById,
    // getVideoById,

} from '../controllers/mediaController.js'; 


const router = express.Router();

// Route to upload an image
router.post('/upload/image', uploadImage);

router.get('/images', getImages);


// Fetch a specific image by ID
router.get('/images/:id', getImageById);






router.delete('/images/:id', deleteImage);

router.delete('/images',  deleteImageByUrl);

// Route to delete all images
router.delete('/imagess', deleteAllImages);


export default router;





// // Route to delete a specific image by ID
// router.delete('/images/:id', deleteImageById);

// // Route to upload a video
// router.post('/upload/video', uploadVideo);




// // Route to get all videos
// router.get('/videos', getVideos);

// // Route to get a specific video by ID
// router.get('/videos/:id', getVideoById);

// // Route to delete a specific video by ID
// router.delete('/videos/:id', deleteVideoById);

// // Route to delete all videos
// router.delete('/videos', deleteAllVideos);














// import express from 'express';
// import { uploadMediaToS3 } from '../controllers/mediaController.js';
// import upload from '../middlewares/multerConfig.js';

// const router = express.Router();

// router.post('/upload', upload.fields([{ name: 'video' }, { name: 'image' }]), uploadMediaToS3); // Allow both fields

// export default router;


// // Fetch all images
// router.get('/images', async (req, res) => {
//     try {
//         const images = await Image.find();  // Get all images from MongoDB
//         res.status(200).json(images);
//     } catch (err) {
//         res.status(500).json({ message: 'Error fetching images', error: err.message });
//     }
// });


// for id
// // Fetch a specific image by its ID
// router.get('/images/:id', async (req, res) => {
//     try {
//         const image = await Image.findById(req.params.id);  // Get image by ID
//         if (!image) {
//             return res.status(404).json({ message: 'Image not found' });
//         }
//         res.status(200).json(image);
//     } catch (err) {
//         res.status(500).json({ message: 'Error fetching image', error: err.message });
//     }
// });