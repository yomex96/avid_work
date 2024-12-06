// // routes/featuresRoute.js
// import express from "express";
// import { addVideoUrls, 
//     getAllVideos, 
//     // addVideoUrl, 
//     updateVideoUrl, deleteVideoUrl, deleteAllVideos } from "../controllers/featuresVideos.js";

// const router = express.Router();

// // Route to add a single video URL
// // router.post("/videosurl", addVideoUrl);

// router.post("/videosurl", addVideoUrls);

// // Route to get all video URLs
// router.get("/videosurl", getAllVideos);

// // Route for updating a video URL by the old URL
// router.put('/update/:oldVideoUrl', updateVideoUrl);

// // Route for deleting a video URL by URL
// router.delete('/delete/:videoUrl', deleteVideoUrl);


// // Route for deleting a video URL by URL
// router.delete('/delete_videos/all', deleteAllVideos);

// export default router;


import express from "express";
import {
  getAllVideos,
  replaceVideos,
  addVideo,
  removeVideo,
  deleteAllVideos, 
} from "../controllers/featuresVideos.js";

const router = express.Router();

// **1. GET: Retrieve all videos**
router.get("/features", getAllVideos);

// **2. PUT: Replace the entire video list**
router.put("/features/edit", replaceVideos);

// **3. POST: Add a single video**
router.post("/features/add", addVideo);

// **4. DELETE: Remove a single video**
router.delete("/features/remove", removeVideo);

// New route for deleting all videos
router.delete("/features/delete-all", deleteAllVideos);

export default router;

