// // controllers/featuresVideos.js
// import Video from "../models/featuresModel.js";

// controllers/featuresVideos.js
import UniqueVideo from "../models/featuresModel.js";

// **Retrieve all videos**
export const getAllVideos = async (req, res) => {
    try {
      const videos = await UniqueVideo.find();
      res.status(200).json({ videos });
    } catch (err) {
      res.status(500).json({ error: "Server error", details: err.message });
    }
  };



// **Replace the entire video list**
export const replaceVideos = async (req, res) => {
    try {
      const { videoUrls } = req.body; // Expect an array of URLs
  
      // Validate input
      if (!Array.isArray(videoUrls) || videoUrls.length > 5) {
        return res.status(400).json({
          error: "Invalid input. Provide an array of up to 5 URLs.",
        });
      }
  
      // Replace the existing list with the new one
      await UniqueVideo.deleteMany(); // Remove all existing videos
  
      const newVideos = videoUrls.map((url) => ({ url })); // Prepare new video objects
      const savedVideos = await UniqueVideo.insertMany(newVideos);
  
      res.status(200).json({
        message: "Videos replaced successfully.",
        videos: savedVideos,
      });
    } catch (err) {
      res.status(500).json({ error: "Server error", details: err.message });
    }
  };

  

// // **Add a single video**
// export const addVideo = async (req, res) => {
//     try {
//       const { url } = req.body; // Expect a single URL
  
//       // Validate input
//       if (!url) {
//         return res.status(400).json({ error: "URL is required." });
//       }
  
//       // Fetch the current video count
//       const videoCount = await UniqueVideo.countDocuments();
//       if (videoCount >= 5) {
//         return res.status(400).json({ error: "Cannot add more than 5 videos." });
//       }
  
//       // Add the new video
//       const newVideo = new UniqueVideo({ url });
//       const savedVideo = await newVideo.save();
  
//       res.status(201).json({
//         message: "Video added successfully.",
//         video: savedVideo,
//       });
//     } catch (err) {
//       res.status(500).json({ error: "Server error", details: err.message });
//     }
//   };

export const addVideo = async (req, res) => {
  try {
    const { urls } = req.body; // Expect an array of URLs

    // Validate input
    if (!urls || !Array.isArray(urls)) {
      return res.status(400).json({ error: "An array of URLs is required." });
    }

    if (urls.length < 1) {
      return res.status(400).json({ error: "You must provide at least 1 URL." });
    }

    // Validate each URL in the array (optional, but recommended)
    urls.forEach((url) => {
      if (!url || typeof url !== "string") {
        throw new Error("Invalid URL format.");
      }
    });

    // Fetch the current video count
    const videoCount = await UniqueVideo.countDocuments();
    if (videoCount + urls.length < 5) {
      return res.status(400).json({
        error: "The database must have at least 5 videos. Please upload more to meet the requirement.",
      });
    }

    // Add the new videos
    const newVideos = urls.map((url) => new UniqueVideo({ url }));
    const savedVideos = await UniqueVideo.insertMany(newVideos); // Use insertMany to add multiple

    res.status(201).json({
      message: "Videos added successfully.",
      videos: savedVideos,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};





// working perfectly 💙💙💙
// export const addVideo = async (req, res) => {
//   try {
//     const { urls } = req.body; // Expect an array of URLs

//     // Validate input
//     if (!urls || !Array.isArray(urls)) {
//       return res.status(400).json({ error: "An array of URLs is required." });
//     }

//     if (urls.length < 1 || urls.length > 5) {
//       return res.status(400).json({ error: "You must provide between 1 and 5 URLs." });
//     }

//     // Validate each URL in the array (optional, but recommended)
//     urls.forEach((url) => {
//       if (!url || typeof url !== "string") {
//         throw new Error("Invalid URL format.");
//       }
//     });

//     // Fetch the current video count to make sure we don't exceed 5
//     const videoCount = await UniqueVideo.countDocuments();
//     if (videoCount + urls.length > 5) {
//       return res.status(400).json({ error: "Cannot add more than 5 videos in total." });
//     }

//     // Add the new videos
//     const newVideos = urls.map((url) => new UniqueVideo({ url }));
//     const savedVideos = await UniqueVideo.insertMany(newVideos); // Use insertMany to add multiple

//     res.status(201).json({
//       message: "Videos added successfully.",
//       videos: savedVideos,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Server error", details: err.message });
//   }
// };


  

// **Remove a single video**
export const removeVideo = async (req, res) => {
    try {
      const { url } = req.body; // Expect a single URL
  
      // Validate input
      if (!url) {
        return res.status(400).json({ error: "URL is required." });
      }
  
      // Delete the video
      const deletedVideo = await UniqueVideo.findOneAndDelete({ url });
  
      if (!deletedVideo) {
        return res.status(404).json({ error: "Video not found." });
      }
  
      res.status(200).json({
        message: "Video removed successfully.",
        video: deletedVideo,
      });
    } catch (err) {
      res.status(500).json({ error: "Server error", details: err.message });
    }
  };

// **Delete all videos**
export const deleteAllVideos = async (req, res) => {
    try {
      // Remove all documents from the collection
      await UniqueVideo.deleteMany();
  
      res.status(200).json({
        message: "All videos have been successfully deleted.",
      });
    } catch (err) {
      res.status(500).json({
        error: "Server error. Unable to delete videos.",
        details: err.message,
      });
    }
  };


// my alternative

// for s3key sections
  
// import UniqueVideo from "../models/featuresModel.js";

// // **Retrieve all videos**
// export const getAllVideos = async (req, res) => {
//   try {
//     const videos = await UniqueVideo.find();
//     res.status(200).json({ videos });
//   } catch (err) {
//     res.status(500).json({ error: "Server error", details: err.message });
//   }
// };

// // **Replace the entire video list**
// export const replaceVideos = async (req, res) => {
//   try {
//     const { s3Keys } = req.body; // Expect an array of s3Keys

//     // Validate input
//     if (!Array.isArray(s3Keys) || s3Keys.length > 5) {
//       return res.status(400).json({
//         error: "Invalid input. Provide an array of up to 5 s3Keys.",
//       });
//     }

//     // Replace the existing list with the new one
//     await UniqueVideo.deleteMany(); // Remove all existing videos

//     const newVideos = s3Keys.map((s3Key) => ({ s3Key })); // Prepare new video objects
//     const savedVideos = await UniqueVideo.insertMany(newVideos);

//     res.status(200).json({
//       message: "Videos replaced successfully.",
//       videos: savedVideos,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Server error", details: err.message });
//   }
// };

// // **Add a single video**
// export const addVideo = async (req, res) => {
//   try {
//     const { s3Key } = req.body; // Expect a single s3Key

//     // Validate input
//     if (!s3Key) {
//       return res.status(400).json({ error: "s3Key is required." });
//     }

//     // Fetch the current video count
//     const videoCount = await UniqueVideo.countDocuments();
//     if (videoCount >= 5) {
//       return res.status(400).json({ error: "Cannot add more than 5 videos." });
//     }

//     // Add the new video
//     const newVideo = new UniqueVideo({ s3Key });
//     const savedVideo = await newVideo.save();

//     res.status(201).json({
//       message: "Video added successfully.",
//       video: savedVideo,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Server error", details: err.message });
//   }
// };

// // **Remove a single video**
// export const removeVideo = async (req, res) => {
//   try {
//     const { s3Key } = req.body; // Expect a single s3Key

//     // Validate input
//     if (!s3Key) {
//       return res.status(400).json({ error: "s3Key is required." });
//     }

//     // Delete the video
//     const deletedVideo = await UniqueVideo.findOneAndDelete({ s3Key });

//     if (!deletedVideo) {
//       return res.status(404).json({ error: "Video not found." });
//     }

//     res.status(200).json({
//       message: "Video removed successfully.",
//       video: deletedVideo,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "Server error", details: err.message });
//   }
// };

// // **Delete all videos**
// export const deleteAllVideos = async (req, res) => {
//   try {
//     // Remove all documents from the collection
//     await UniqueVideo.deleteMany();

//     res.status(200).json({
//       message: "All videos have been successfully deleted.",
//     });
//   } catch (err) {
//     res.status(500).json({
//       error: "Server error. Unable to delete videos.",
//       details: err.message,
//     });
//   }
// };


















//   // Replace All Videos with a New Set
// export const replaceAllVideos = async (req, res) => {
//     const { videoUrls } = req.body; // Expect an array of new video URLs
  
//     try {
//       // Validate input
//       if (!Array.isArray(videoUrls) || !videoUrls.every((url) => typeof url === "string")) {
//         return res.status(400).json({ error: "Invalid input. An array of valid video URLs is required." });
//       }
  
//       // Ensure the number of new URLs does not exceed the limit
//       if (videoUrls.length > 5) {
//         return res.status(400).json({ error: "You can only save up to 5 video URLs." });
//       }
  
//       // Start a transaction to ensure atomicity
//       const session = await UniqueVideo.startSession();
//       session.startTransaction();
  
//       try {
//         // Delete all existing videos
//         await UniqueVideo.deleteMany({}, { session });
  
//         // Insert the new set of videos
//         const newVideos = videoUrls.map((url) => ({ url }));
//         const savedVideos = await UniqueVideo.insertMany(newVideos, { session });
  
//         // Commit the transaction
//         await session.commitTransaction();
//         session.endSession();
  
//         // Respond with the saved videos
//         res.status(201).json(savedVideos);
//       } catch (error) {
//         // Abort the transaction on error
//         await session.abortTransaction();
//         session.endSession();
//         throw error;
//       }
//     } catch (error) {
//       // Handle errors
//       res.status(500).json({ error: error.message });
//     }
//   };
  