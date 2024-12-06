
import { S3 } from '@aws-sdk/client-s3';
import multer from 'multer';
import dotenv from 'dotenv';
import Videos from '../models/videoModel.js';



// import Video from '../models/videoModel.js';
// import Videos from '../models/videoModel.js';

// import { MediaService } from '../models/mediaModel.js';

import { promisify } from 'util';

dotenv.config();

const s3 = new S3({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

//come back

// Configure multer
const storage = multer.memoryStorage();
const upload = multer({ storage });



import { MediaService, MediaVideo } from '../models/serviceModel.js';



// import { s3 } from '../config/s3.js';
// import multer from 'multer';

// const upload = multer({ storage: multer.memoryStorage() });


// export const uploadVideoToCategory = (req, res) => {
//     const { mediaServiceId, categoryId } = req.params;

//     MediaService.findById(mediaServiceId).then(async (service) => {
//         if (!service) {
//             return res.status(404).json({ message: 'Media service not found.' });
//         }

//         const category = service.categories.id(categoryId);
//         if (!category) {
//             return res.status(404).json({ message: 'Category not found.' });
//         }

//         upload.single('video')(req, res, async (err) => {
//             if (err) return res.status(400).json({ message: 'Error uploading video', error: err.message });
//             if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

//             const s3Key = `video/${Date.now()}_${req.file.originalname}`;
//             const params = {
//                 Bucket: process.env.AWS_S3_BUCKET_NAME,
//                 Key: s3Key,
//                 Body: req.file.buffer,
//                 ContentType: req.file.mimetype,
//             };

//             try {
//                 // await s3.putObject(params).promise();

//                 await s3.putObject(params); 

//                 const newVideo = new MediaVideo({
//                     filename: req.file.originalname,
//                     url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${s3Key}`,
//                     s3Key,
//                 });

//                 await newVideo.save();

//                 category.videos.push(newVideo._id);
//                 await service.save();

//                 return res.status(200).json({
//                     message: 'Video uploaded successfully!',
//                     video: newVideo,
//                 });
//             } catch (uploadErr) {
//                 console.error('Error uploading to S3:', uploadErr);
//                 return res.status(500).json({ message: 'Error uploading to S3', error: uploadErr.message });
//             }
//         });
//     }).catch((err) => {
//         console.error('Error finding media service:', err);
//         return res.status(500).json({ message: 'Error finding media service', error: err.message });
//     });
// };




// // Upload video to category ----==-=--=---- Part 1


// export const uploadVideoToCategory = (req, res) => {
//     const { mediaServiceId, categoryId } = req.params;
  
//     // Find the media service by serviceId
//     MediaService.findOne({ serviceId: mediaServiceId }).then(async (service) => {
//       if (!service) {
//         return res.status(404).json({ message: 'Media service not found.' });
//       }
  
//       // Find the category by categoryId within the service
//       const category = service.categories.find(cat => cat.categoryId === categoryId);
//       if (!category) {
//         return res.status(404).json({ message: 'Category not found.' });
//       }
  
//       // Handle file upload
//       upload.single('video')(req, res, async (err) => {
//         if (err) return res.status(400).json({ message: 'Error uploading video', error: err.message });
//         if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  
//         // Generate the S3 key for storing the video
//         const s3Key = `video/${Date.now()}_${req.file.originalname}`;
//         const params = {
//           Bucket: process.env.AWS_S3_BUCKET_NAME,
//           Key: s3Key,
//           Body: req.file.buffer,
//           ContentType: req.file.mimetype,
//         };
  
//         try {
//           // Upload the video to S3
//           await s3.putObject(params);

          
//         //   await s3.putObject(params).promise();
  
//           // Create a new video entry in the database
//           const newVideo = new MediaVideo({
//             filename: req.file.originalname,
//             url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${s3Key}`,
//             s3Key,
//           });
  
//           // Save the video in the database
//           await newVideo.save();
  
//           // Add the video to the category's videos array
//           category.videos.push(newVideo._id);
//           await service.save();
  
//           // Return success response
//           return res.status(200).json({
//             message: 'Video uploaded successfully!',
//             video: newVideo,
//           });
//         } catch (uploadErr) {
//           console.error('Error uploading to S3:', uploadErr);
//           return res.status(500).json({ message: 'Error uploading to S3', error: uploadErr.message });
//         }
//       });
//     }).catch((err) => {
//       console.error('Error finding media service:', err);
//       return res.status(500).json({ message: 'Error finding media service', error: err.message });
//     });
//   };





///working please be sure before deleting 💙🧡🧡

// export const uploadVideoToCategory = (req, res) => {
//     const { mediaServiceId, categoryId } = req.params;  
  
//     // Find the media service by serviceId
//     MediaService.findOne({ 'serviceId': mediaServiceId }).then(async (service) => {
//       if (!service) {
//         return res.status(404).json({ message: 'Media service not found.' });
//       }
  
//       // Find the category by categoryId within the service
//       const category = service.categories.find(cat => cat.categoryId === categoryId);
//       if (!category) {
//         return res.status(404).json({ message: 'Category not found.' });
//       }
  
//       // Handle file upload
//       upload.single('video')(req, res, async (err) => {
//         if (err) return res.status(400).json({ message: 'Error uploading video', error: err.message });
//         if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  
//         // Generate the S3 key for storing the video
//         const s3Key = `video/${Date.now()}_${req.file.originalname}`;
//         const params = {
//           Bucket: process.env.AWS_S3_BUCKET_NAME,
//           Key: s3Key,
//           Body: req.file.buffer,
//           ContentType: req.file.mimetype,
//         };
  
//         try {
//           // Upload the video to S3
//           await s3.putObject(params); 
//         //   await s3.putObject(params).promise();
  
//           // Create a new video entry in the database
//           const newVideo = new MediaVideo({
//             filename: req.file.originalname,
//             url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${s3Key}`,
//             s3Key,
//           });
  
//           // Save the video in the database
//           await newVideo.save();
  
//           // Add the video to the category's videos array
//           category.videos.push(newVideo._id);
//           await service.save();
  
//           // Return success response
//           return res.status(200).json({
//             message: 'Video uploaded successfully!',
//             video: newVideo,
//           });
//         } catch (uploadErr) {
//           console.error('Error uploading to S3:', uploadErr);
//           return res.status(500).json({ message: 'Error uploading to S3', error: uploadErr.message });
//         }
//       });
//     }).catch((err) => {
//       console.error('Error finding media service:', err);
//       return res.status(500).json({ message: 'Error finding media service', error: err.message });
//     });
//   };



//part 2 of uploadidng videos

// export const uploadVideoToCategory = (req, res) => {
//   const { mediaServiceName, categoriesname } = req.params;

//   // Log parameters for debugging
//   console.log('Media Service Name:', mediaServiceName);
//   console.log('Categories Name:', categoriesname);

//   // Find the media service by name
//   MediaService.findOne({ name: mediaServiceName }).then(async (service) => {
//     if (!service) {
//       return res.status(404).json({ message: 'Media service not found.' });
//     }

//     // Log the service and its categories
//     console.log('Found Media Service:', service);
//     console.log('Categories:', service.categories);

//     // Find the category by categoriesname within the media service's categories
//     const category = service.categories.find(cat => cat.categoriesname === categoriesname);
//     if (!category) {
//       return res.status(404).json({ message: `Category with name ${categoriesname} not found.` });
//     }

//     // Handle file upload using multer (middleware)
//     upload.single('video')(req, res, async (err) => {
//       if (err) return res.status(400).json({ message: 'Error uploading video', error: err.message });
//       if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

//       // Generate the S3 key for storing the video
//       const s3Key = `video/${Date.now()}_${req.file.originalname}`;
//       const params = {
//         Bucket: process.env.AWS_S3_BUCKET_NAME,
//         Key: s3Key,
//         Body: req.file.buffer,
//         ContentType: req.file.mimetype,
//       };

//       try {
//         // Upload the video to S3
//         await s3.putObject(params);

//         // Create a new video entry in the database
//         const newVideo = new MediaVideo({
//           filename: req.file.originalname,
//           url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${s3Key}`,
//           s3Key,
//         });

//         // Save the video in the database
//         await newVideo.save();

//         // Add the video to the category's videos array
//         category.videos.push(newVideo._id);
//         await service.save();

//         // Return success response
//         return res.status(200).json({
//           message: 'Video uploaded successfully!',
//           video: newVideo,
//         });
//       } catch (uploadErr) {
//         console.error('Error uploading to S3:', uploadErr);
//         return res.status(500).json({ message: 'Error uploading to S3', error: uploadErr.message });
//       }
//     });
//   }).catch((err) => {
//     console.error('Error finding media service:', err);
//     return res.status(500).json({ message: 'Error finding media service', error: err.message });
//   });
// };


//part 3


export const uploadVideoToCategory = (req, res) => {
  const { mediaServiceName, categoriesname } = req.params;

  // Log parameters for debugging
  console.log('Media Service Name:', mediaServiceName);
  console.log('Categories Name:', categoriesname);

  // Find the media service by name
  MediaService.findOne({ name: mediaServiceName }).then(async (service) => {
    if (!service) {
      return res.status(404).json({ message: 'Media service not found.' });
    }

    // Log the service and its categories
    console.log('Found Media Service:', service);
    console.log('Categories:', service.categories);

    // Find the category by categoriesname within the media service's categories
    const category = service.categories.find(cat => cat.categoriesname === categoriesname);
    if (!category) {
      return res.status(404).json({ message: `Category with name ${categoriesname} not found.` });
    }

    // Check if the description is empty or null
    if (!category.description || category.description.trim() === '') {
      return res.status(400).json({ 
        message: `Video upload not allowed. The description for category "${categoriesname}" is empty.` 
      });
    }

    // Handle file upload using multer (middleware)
    upload.single('video')(req, res, async (err) => {
      if (err) return res.status(400).json({ message: 'Error uploading video', error: err.message });
      if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

      // Generate the S3 key for storing the video
      const s3Key = `video/${Date.now()}_${req.file.originalname}`;
      const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: s3Key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };

      try {
        // Upload the video to S3
        await s3.putObject(params);
        // await s3.putObject(params).promise();

        // Create a new video entry in the database
        const newVideo = new MediaVideo({
          filename: req.file.originalname,
          url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${s3Key}`,
          s3Key,
        });

        // Save the video in the database
        await newVideo.save();

        // Add the video to the category's videos array
        category.videos.push(newVideo._id);
        await service.save();

        // Return success response
        return res.status(200).json({
          message: 'Video uploaded successfully!',
          video: newVideo,
        });
      } catch (uploadErr) {
        console.error('Error uploading to S3:', uploadErr);
        return res.status(500).json({ message: 'Error uploading to S3', error: uploadErr.message });
      }
    });
  }).catch((err) => {
    console.error('Error finding media service:', err);
    return res.status(500).json({ message: 'Error finding media service', error: err.message });
  });
};




export const getServiceDetailsbyname = async (req, res) => {
    try {
      // Extract the service name from params
      const { name } = req.params;
  
      // Find the service by name (case-insensitive)
      const service = await MediaService.findOne({
        name: new RegExp(`^${name}$`, 'i'), // Corrected the RegExp syntax
      }).populate({
        path: 'categories',
        populate: {
          path: 'videos',
          select: 'filename url',
        },
      });
  
      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }
  
      // Send the service details and populated categories and videos
      const serviceDetails = {
        name: service.name,
        categories: service.categories.map(category => ({
          name: category.name,
          description: category.description,
          videos: category.videos.map(video => ({
            filename: video.filename,
            url: video.url,
          })),
          categoryId: category.categoryId,
        })),
      };
  
      res.status(200).json(serviceDetails);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  
  
export const getVideosByCategory = async (req, res) => {
  const { mediaServiceId, categoryId } = req.params;
  console.log("Received mediaServiceId:", mediaServiceId);
  console.log("Received categoryId:", categoryId);

  try {
    // Find the media service by serviceId
    const mediaService = await MediaService.findOne({ serviceId: mediaServiceId }).populate({
      path: 'categories',
      match: { categoryId },  // Only populate the specific category
      populate: {
        path: 'videos',
        select: 'filename url',  // Select fields to include in the response
      },
    });

    if (!mediaService) {
      console.log("Media Service not found with serviceId:", mediaServiceId);
      return res.status(404).json({ message: 'Media Service not found.' });
    }

    // Retrieve the specific category with the populated videos
    const category = mediaService.categories.find(cat => cat.categoryId === categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    // Prepare the response with detailed video information
    const categoryDetails = {
      name: category.name,
      description: category.description,
      categoryId: category.categoryId,
      videos: category.videos.map(video => ({
        filename: video.filename,
        url: video.url,
      })),
    };

    // Return the category with detailed video information
    return res.status(200).json({
      message: 'Category retrieved successfully!',
      category: categoryDetails,
    });
  } catch (err) {
    console.error('Error fetching category:', err);
    return res.status(500).json({ message: 'Error fetching category', error: err.message });
  }
};


//not needed 

// export const getVideosByCategory = async (req, res) => {
//     const { mediaServiceId, categoryId } = req.params;
//     console.log("Received mediaServiceId:", mediaServiceId);
//     console.log("Received categoryId:", categoryId);
  
//     try {
//       // Find the media service by serviceId (or change `_id` if needed)
//       const mediaService = await MediaService.findOne({ serviceId: mediaServiceId });
//       if (!mediaService) {
//         console.log("Media Service not found with serviceId:", mediaServiceId);
//         return res.status(404).json({ message: 'Media Service not found.' });
//       }
  
//       // Find the specific category within the media service by categoryId
//       const category = mediaService.categories.find(cat => cat.categoryId === categoryId);
//       if (!category) {
//         return res.status(404).json({ message: 'Category not found.' });
//       }
  
//       // Fetch the details of each video by their IDs
//       const videoDetails = await Videos.find({ '_id': { $in: category.videos } });
  
//       // Return the category along with detailed video information
//       return res.status(200).json({
//         message: 'Category retrieved successfully!',
//         category: {
//           ...category._doc,
//           videos: videoDetails,
//         },
//       });
//     } catch (err) {
//       console.error('Error fetching category:', err);
//       return res.status(500).json({ message: 'Error fetching category', error: err.message });
//     }
//   };




// // working url  old functions for url 


// export const deleteVideoFromCategoryByUrl = async (req, res) => {
//     const { mediaServiceId, categoryId } = req.params;
//     const { url } = req.body;

//     try {
//       // Find the media service
//       const service = await MediaService.findOne({ serviceId: mediaServiceId });
//       if (!service) {
//         return res.status(404).json({ message: 'Media service not found.' });
//       }

//       // Find the category within the service
//       const category = service.categories.find(cat => cat.categoryId === categoryId);
//       if (!category) {
//         return res.status(404).json({ message: 'Category not found.' });
//       }

//       // Find the video in the database using the URL
//       const video = await MediaVideo.findOne({ url });
//       if (!video) {
//         return res.status(404).json({ message: 'Video not found.' });
//       }

//       // Extract the S3 key from the video entry
//       const s3Key = video.s3Key;

//       // Remove the video from S3
//       const deleteParams = {
//         Bucket: process.env.AWS_S3_BUCKET_NAME,
//         Key: s3Key,
//       };
    

//     s3.deleteObject(deleteParams);

//       // Remove the video reference from the category's videos array
//       await MediaService.findOneAndUpdate(
//         { serviceId: mediaServiceId, 'categories.categoryId': categoryId },  
//         { $pull: { 'categories.$.videos': video._id } },  
//         { new: true, useFindAndModify: false }  
//       );

//       // Delete the video document from the database
//       await video.deleteOne();

//       return res.status(200).json({ message: 'Video deleted successfully.' });
//     } catch (error) {
//       console.error('Error deleting video:', error);
//       return res.status(500).json({ message: 'Error deleting video', error: error.message });
//     }
// };

export const deleteVideoFromCategoryByUrl = async (req, res) => {
  const { mediaServiceName, categoriesname } = req.params;
  const { url } = req.body;

  try {
    // Query with "name" instead of "serviceName"
    const service = await MediaService.findOne({ name: mediaServiceName });
    if (!service) {
      return res.status(404).json({ message: 'Media service not found.' });
    }

    const category = service.categories.find(cat => cat.categoriesname === categoriesname);
    if (!category) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    const video = await MediaVideo.findOne({ url });
    if (!video) {
      return res.status(404).json({ message: 'Video not found.' });
    }

    const s3Key = video.s3Key;
    const deleteParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: s3Key,
    };

    await s3.deleteObject(deleteParams);

    await MediaService.findOneAndUpdate(
      { name: mediaServiceName, 'categories.categoriesname': categoriesname },
      { $pull: { 'categories.$.videos': { _id: video._id } } },
      { new: true, useFindAndModify: false }
    );

    await video.deleteOne();

    return res.status(200).json({ message: 'Video deleted successfully.' });
  } catch (error) {
    console.error('Error deleting video:', error);
    return res.status(500).json({ message: 'Error deleting video', error: error.message });
  }
};


// Delete video from category using s3Key
export const deleteVideoFromCategoryByS3Key = async (req, res) => {
  const { mediaServiceName, categoriesname } = req.params;
  const { s3key } = req.body;

  try {
    // Find the media service by name
    const service = await MediaService.findOne({ name: mediaServiceName });
    if (!service) {
      return res.status(404).json({ message: 'Media service not found.' });
    }

    // Find the category within the service by categoriesname
    const category = service.categories.find(cat => cat.categoriesname === categoriesname);
    if (!category) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    // Find the video in the database using the s3key
    const video = await MediaVideo.findOne({ s3Key: s3key });
    if (!video) {
      return res.status(404).json({ message: 'Video not found.' });
    }

    // Remove the video from S3
    const deleteParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: s3key,
    };

    await s3.deleteObject(deleteParams);

    // Remove the video reference from the category
    category.videos = category.videos.filter(vId => vId.toString() !== video._id.toString());
    await service.save();

    // Delete the video document from the database
    await video.deleteOne();

    return res.status(200).json({ message: 'Video deleted successfully.' });
  } catch (error) {
    console.error('Error deleting video:', error);
    return res.status(500).json({ message: 'Error deleting video', error: error.message });
  }
};


// old functions

// // Delete video from category using s3Key
// export const deleteVideoFromCategoryByS3Key = async (req, res) => {
//     const { mediaServiceId, categoryId } = req.params;
//     const { s3Key } = req.body;
  
//     try {
//       // Find the media service
//       const service = await MediaService.findOne({ serviceId: mediaServiceId });
//       if (!service) {
//         return res.status(404).json({ message: 'Media service not found.' });
//       }
  
//       // Find the category within the service
//       const category = service.categories.find(cat => cat.categoryId === categoryId);
//       if (!category) {
//         return res.status(404).json({ message: 'Category not found.' });
//       }
  
//       // Find the video in the database using the s3Key
//       const video = await MediaVideo.findOne({ s3Key });
//       if (!video) {
//         return res.status(404).json({ message: 'Video not found.' });
//       }
  
//       // Remove the video from S3
//       const deleteParams = {
//         Bucket: process.env.AWS_S3_BUCKET_NAME,
//         Key: s3Key,
//       };
  
//       await s3.deleteObject(deleteParams).promise();
  
//       // Remove the video reference from the category
//       category.videos = category.videos.filter(vId => vId.toString() !== video._id.toString());
//       await service.save();
  
//       // Delete the video document from the database
//       await video.deleteOne();
  
//       return res.status(200).json({ message: 'Video deleted successfully.' });
//     } catch (error) {
//       console.error('Error deleting video:', error);
//       return res.status(500).json({ message: 'Error deleting video', error: error.message });
//     }
//   };
  
  

// export const getVideos = async (req, res) => {
//     try {
//         const videos = await Video.find(); // Fetch all videos from the database
//         return res.status(200).json(videos); // Return videos as JSON
//     } catch (err) {
//         return res.status(500).json({ message: 'Error fetching videos', error: err.message });
//     }
// };

// export const getVideos = async (req, res) => {
//     try {
//         const videos = await Video.find(); // Fetch all videos without populate
//         return res.status(200).json(videos); // Return videos as JSON
//     } catch (err) {
//         return res.status(500).json({ message: 'Error fetching videos', error: err.message });
//     }
// };









export const getVideoById = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id); // Fetch video by ID
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }
        return res.status(200).json(video); // Return the video as JSON
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching video', error: err.message });
    }
};






export const deleteVideoById = async (req, res) => {
    const { id } = req.params; // Assuming the ID is passed as a URL parameter

    try {
        // Fetch the video from the database by ID
        const video = await Video.findById(id);

        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        // Delete the video from S3
        const deleteParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: video.s3Key, // Use the S3 key from the fetched video
        };

        await s3.deleteObject(deleteParams);

        // Now delete the video record from the database
        await Video.findByIdAndDelete(id);

        return res.status(200).json({ message: 'Video deleted successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Error deleting video', error: err.message });
    }
};

export const deleteAllVideos = async (req, res) => {
    try {
        const videos = await Video.find(); // Fetch all videos from the database

        if (videos.length === 0) {
            return res.status(404).json({ message: 'No videos to delete' });
        }

        // Iterate over all videos and delete each from S3
        const deletePromises = videos.map(async (video) => {
            const params = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: video.s3Key // Assuming the video document stores the S3 object key
            };

            // Log the params to verify the Key value
            console.log('Deleting S3 object with params:', params);

            try {
                await s3.deleteObject(params); // Directly use the deleteObject method
            } catch (deleteErr) {
                console.error(`Error deleting video with s3Key ${video.s3Key}:`, deleteErr);
            }
        });

        await Promise.all(deletePromises); // Wait for all videos to be deleted from S3

        // Remove all videos from the database
        await Video.deleteMany();

        return res.status(200).json({ message: 'All videos deleted successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Error deleting videos', error: err.message });
    }
}

















// import { S3 } from '@aws-sdk/client-s3';
// import multer from 'multer';
// import dotenv from 'dotenv';
// // import Video from '../models/videoModel.js';
// // import Videos from '../models/videoModel.js';

// import { MediaService } from '../models/mediaModel.js';

// import { promisify } from 'util';

// dotenv.config();

// const s3 = new S3({
//     region: process.env.AWS_REGION,
//     credentials: {
//         accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//         secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     },
// });


// // Configure multer
// const storage = multer.memoryStorage();
// const upload = multer({ storage });



//working above 💙 without service name 

// export const uploadVideo = (req, res) => {
//     upload.single('video')(req, res, async (err) => {
//         if (err) {
//             return res.status(400).json({ message: 'Error uploading video', error: err.message });
//         }

//         if (!req.file) {
//             return res.status(400).json({ message: 'No file uploaded' });
//         }

//         const s3Key = `videos/${Date.now()}_${req.file.originalname}`;

//         const params = {
//             Bucket: process.env.AWS_S3_BUCKET_NAME,
//             Key: s3Key,
//             Body: req.file.buffer,
//             ContentType: req.file.mimetype,
//         };

//         try {
//             await s3.putObject(params); // Upload to S3

//             // Save video metadata to the database
//             const newVideo = new Video({
//                 filename: req.file.originalname,
//                 url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${s3Key}`,
//                 s3Key: s3Key,
//             });

//             await newVideo.save(); // Save to the database

//             return res.status(200).json({
//                 message: 'Video uploaded successfully!',
//                 video: newVideo, // Return the saved video object
//             });
//         } catch (uploadErr) {
//             console.error('Error uploading to S3', uploadErr);
//             return res.status(500).json({ message: 'Error uploading to S3', error: uploadErr.message });
//         }
//     });
// };


// // Video upload handler
// export const uploadVideo = (req, res) => {
//     const { serviceName, serviceDescription } = req.body;

//     // Check for missing fields
//     if (!serviceName || !serviceDescription) {
//         return res.status(400).json({ message: 'Service name and description are required.' });
//     }

//     // Handle video upload
//     upload.single('video')(req, res, async (err) => {
//         if (err) {
//             console.error('Error during video upload:', err);
//             return res.status(400).json({ message: 'Error uploading video', error: err.message });
//         }

//         if (!req.file) {
//             return res.status(400).json({ message: 'No file uploaded' });
//         }

//         const s3Key = `video/${Date.now()}_${req.file.originalname}`;

//         const params = {
//             Bucket: process.env.AWS_S3_BUCKET_NAME,
//             Key: s3Key,
//             Body: req.file.buffer,
//             ContentType: req.file.mimetype,
//         };

//         try {
//             // Upload video to S3
//             await s3.putObject(params).promise();

//             // Save video metadata to the database
//             const newVideo = new Videos({
//                 filename: req.file.originalname,
//                 url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${s3Key}`,
//                 s3Key,
//                 serviceName,
//                 serviceDescription,
//             });

//             // Save video in the database
//             await newVideo.save();

//             return res.status(200).json({
//                 message: 'Video uploaded successfully!',
//                 video: newVideo,
//             });
//         } catch (uploadErr) {
//             console.error('Error uploading to S3:', uploadErr);
//             return res.status(500).json({ message: 'Error uploading to S3', error: uploadErr.message });
//         }
//     });
// };



// // Route: POST /upload/video?serviceName=video&serviceDescription=marketing
// export const uploadVideo = (req, res) => {
//     const { serviceName, serviceDescription } = req.query;

//     if (!serviceName || !serviceDescription) {
//         return res.status(400).json({ message: 'Service name and description are required.' });
//     }

//     // Handle video upload
//     upload.single('video')(req, res, async (err) => {
//         if (err) {
//             console.error('Error during video upload:', err);
//             return res.status(400).json({ message: 'Error uploading video', error: err.message });
//         }

//         if (!req.file) {
//             return res.status(400).json({ message: 'No file uploaded' });
//         }

//         const s3Key = `video/${Date.now()}_${req.file.originalname}`;

//         const params = {
//             Bucket: process.env.AWS_S3_BUCKET_NAME,
//             Key: s3Key,
//             Body: req.file.buffer,
//             ContentType: req.file.mimetype,
//         };

//         try {
//             // Upload video to S3
//             // await s3.putObject(params).promise();
//             await s3.putObject(params);

//             // Save video metadata to the database
//             const newVideo = new Videos({
//                 filename: req.file.originalname,
//                 url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${s3Key}`,
//                 s3Key,
//                 serviceName,
//                 serviceDescription,
//             });

//             // Save video in the database
//             await newVideo.save();

//             return res.status(200).json({
//                 message: 'Video uploaded successfully!',
//                 video: newVideo,
//             });
//         } catch (uploadErr) {
//             console.error('Error uploading to S3:', uploadErr);
//             return res.status(500).json({ message: 'Error uploading to S3', error: uploadErr.message });
//         }
//     });
// };



// controllers/videoController.js



// import { Service, Video } from '../models/serviceModel.js';
// import AWS from 'aws-sdk';
// import multer from 'multer';

// const s3 = new AWS.S3();

// // Multer setup for video upload
// const upload = multer({ dest: 'uploads/' }); // You can configure this for your needs



// // Route to upload a video under a service and subcategory
// export const uploadVideo = (req, res) => {
//     const { serviceId, subcategoryId } = req.params;

//     // Find the service by ID
//     Service.findById(serviceId).then(async (service) => {
//         if (!service) {
//             return res.status(404).json({ message: 'Service not found.' });
//         }

//         // Find the subcategory by ID
//         const subcategory = service.subcategories.id(subcategoryId);
//         if (!subcategory) {
//             return res.status(404).json({ message: 'Subcategory not found.' });
//         }

//         // Handle video upload
//         upload.single('video')(req, res, async (err) => {
//             if (err) {
//                 console.error('Error during video upload:', err);
//                 return res.status(400).json({ message: 'Error uploading video', error: err.message });
//             }

//             if (!req.file) {
//                 return res.status(400).json({ message: 'No file uploaded' });
//             }

//             const s3Key = `video/${Date.now()}_${req.file.originalname}`;

//             const params = {
//                 Bucket: process.env.AWS_S3_BUCKET_NAME,
//                 Key: s3Key,
//                 Body: req.file.buffer,
//                 ContentType: req.file.mimetype,
//             };

//             try {
//                 // Upload video to S3
//                 await s3.putObject(params).promise();

//                 // Save video metadata in the database
//                 const newVideo = new Video({
//                     filename: req.file.originalname,
//                     url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${s3Key}`,
//                     s3Key,
//                 });

//                 await newVideo.save();

//                 // Add the new video to the subcategory's videos array
//                 subcategory.videos.push(newVideo._id);
//                 await service.save();

//                 return res.status(200).json({
//                     message: 'Video uploaded successfully!',
//                     video: newVideo,
//                 });
//             } catch (uploadErr) {
//                 console.error('Error uploading to S3:', uploadErr);
//                 return res.status(500).json({ message: 'Error uploading to S3', error: uploadErr.message });
//             }
//         });
//     }).catch((err) => {
//         console.error('Error finding service:', err);
//         return res.status(500).json({ message: 'Error finding service', error: err.message });
//     });
// };
 