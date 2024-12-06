
import express from 'express';

import {  
    // uploadVideo, 
    // getVideos,
    getVideoById,
    deleteVideoById,
    deleteAllVideos,
    

} from '../controllers/videoController.js'; 

// import { createService } from '../controllers/serviceController.js';
// import { uploadVideo } from '../controllers/videoController';

import { 
    // createMediaService, 
    getMediaServices, 
    updateMediaServiceName,
    getServiceDetails, 
    updateCategory, 
    getCategory,
    getServiceVideos,
    deleteMediaService, 
    deleteCategory,
    deleteAllMediaServices,
    getServiceDetailsbyname,
    getServiceNames,
    createMediaServiceName,
addCategoriesToMediaService,
deleteMediaServiceByName,
updateMediaServiceNames,


    } from '../controllers/serviceController.js';

import { uploadVideoToCategory, getVideosByCategory } from '../controllers/videoController.js';

import { deleteVideoFromCategoryByUrl, deleteVideoFromCategoryByS3Key } from '../controllers/videoController.js';




const router = express.Router();


// router.post('/media-services', createMediaService);


// Route to get all media services
router.get('/media-services', getMediaServices);


router.get('/services-name', getServiceNames);

// Define the route for getting video URLs by service name
router.get('/servicesVideos/:serviceName', getServiceVideos);


// Route to get particular media services
router.get('/media-services/:serviceId/category/:categoryId', getCategory);


router.get('/:serviceId', getServiceDetails);


router.get('/name/:name', getServiceDetailsbyname);


//special

router.post('/name', createMediaServiceName);

router.put('/categoryss', addCategoriesToMediaService);


router.put('/services/:currentName', updateMediaServiceNames);



// Route to update the name of a media service
router.put('/media-services/:serviceId', updateMediaServiceName);

router.put('/media-services/:mediaServiceName/category/:categoriesname', updateCategory);


// Route to update category name and description within a media service

// router.put('/media-services/:serviceId/categories/:categoryId', updateCategory);

router.put('/media-services/:serviceName/updates', updateMediaServiceName);


// Route to delete a Media Service by serviceId
router.delete('/media-services/:serviceId', deleteMediaService);

// Route to delete a Category from a Media Service by serviceId and categoryId
router.delete('/media-services/:serviceId/category/:categoryId', deleteCategory);

// Route to delete all Media Service 
router.delete('/media-services', deleteAllMediaServices);

// Route to delete video by URL
// router.delete('/media-services/:mediaServiceId/categories/:categoryId/videos', deleteVideoFromCategoryByUrl);


router.delete('/media/:mediaServiceName/categories/:categoriesname/videos', deleteVideoFromCategoryByUrl);


// Route to delete video by s3Key
// router.delete('/:mediaServiceId/categories/:categoryId/s3key', deleteVideoFromCategoryByS3Key);

router.delete('/media/:mediaServiceName/category/:categoriesname/video', deleteVideoFromCategoryByS3Key);


router.delete('/:serviceName', deleteMediaServiceByName);


// The route expects mediaServiceName and categoryName as part of the URL path
router.post('/upload/video/:mediaServiceName/:categoriesname', uploadVideoToCategory);


router.post('/upload/video/:mediaServiceId/:categoryId', uploadVideoToCategory);


router.get('/media-services/:mediaServiceId/category/:categoryId/videos', getVideosByCategory);







// router.post('/media-services/:mediaServiceId/categories/:categoryId/videos', uploadVideoToCategory);

// router.post('/mediaServices/:mediaServiceId/category/:categoryId/upload', uploadVideoToCategory);








// // Route to create a new service
// router.post('/create_services', createService);


// // Route to upload a video under a service and subcategory
// router.post('/services/:serviceId/subcategories/:subcategoryId/videos', uploadVideo);



// // Route to upload a video
// router.post('/upload/video', uploadVideo);

// // Route to get all videos
// router.get('/', getVideos);

// Route to get a specific video by ID
router.get('/videos/:id', getVideoById);

// Route to delete a specific video by ID
router.delete('/videos/:id', deleteVideoById);

// Route to delete all videos
router.delete('/videos', deleteAllVideos);



export default router;