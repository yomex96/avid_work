import { S3 } from '@aws-sdk/client-s3';
import multer from 'multer';
import dotenv from 'dotenv';
import Image from '../models/imageModel.js'; 
// import Video from '../models/videoModel.js';
import Videos from '../models/videoModel.js';

import { promisify } from 'util';

dotenv.config();

const s3 = new S3({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Configure multer
const storage = multer.memoryStorage();
const upload = multer({ storage });


// export const uploadImage = (req, res) => {
//     upload.single('image')(req, res, async (err) => {
//         if (err) {
//             return res.status(400).json({ message: 'Error uploading image', error: err.message });
//         }

//         if (!req.file) {
//             return res.status(400).json({ message: 'No file uploaded' });
//         }

//         const s3Key = `images/${Date.now()}_${req.file.originalname}`;
//         const params = {
//             Bucket: process.env.AWS_S3_BUCKET_NAME,
//             Key: s3Key,
//             Body: req.file.buffer,
//             ContentType: req.file.mimetype,
//         };

//         try {
//             await s3.putObject(params); // Upload to S3

//             // Save image metadata to the database
//             const newImage = new Image({
//                 filename: req.file.originalname,
//                 url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${s3Key}`,
//                 s3Key: s3Key,
//             });

//             await newImage.save(); // Save to the database

//             return res.status(200).json({
//                 message: 'Image uploaded successfully!',
//                 image: {
//                     _id: newImage._id,     // MongoDB ID
//                     url: newImage.url,      // S3 URL
//                     s3Key: newImage.s3Key   // S3 key
//                 },
//             });
//         } catch (uploadErr) {
//             console.error('Error uploading to S3', uploadErr);
//             return res.status(500).json({ message: 'Error uploading to S3', error: uploadErr.message });
//         }
//     });
// };



export const uploadImage = (req, res) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'Error uploading image', error: err.message });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const s3Key = `images/${Date.now()}_${req.file.originalname}`;

        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: s3Key,
            Body: req.file.buffer,
            ContentType: req.file.mimetype,
        };

        try {
            await s3.putObject(params); 

            // Save image metadata to the database
            const newImage = new Image({
                filename: req.file.originalname,
                url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${s3Key}`,
                s3Key: s3Key,
            });

            await newImage.save(); 

            // return res.status(200).json({
            //     message: 'Image uploaded successfully!',
            //     image: newImage, // Return the saved image object
            // });
            return res.status(200).json({
                message: 'Image uploaded successfully!',
                image: {
                    _id: newImage._id,     
                    url: newImage.url,      
                    s3Key: newImage.s3Key   
                },
            });
        } catch (uploadErr) {
            console.error('Error uploading to S3', uploadErr);
            return res.status(500).json({ message: 'Error uploading to S3', error: uploadErr.message });
        }
    });
};



export const getImages = async (req, res) => {
    try {
        const images = await Image.find(); 
        return res.status(200).json(images); 
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching images', error: err.message });
    }
};


export const getImageById = async (req, res) => {
    try {
        const image = await Image.findById(req.params.id); 
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }
        return res.status(200).json(image); 
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching image', error: err.message });
    }
};



// Updated deleteImage function to delete by URL
export const deleteImage = async (req, res) => {
    const { url } = req.body; // Get image URL from request body

    try {
        // Fetch the image document using the URL
        const image = await Image.findOne({ url });
        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }

        const deleteParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: image.s3Key, // Use the s3Key from the image document
        };

        // Delete the image from S3
        s3.deleteObject(deleteParams, async (err, data) => {
            if (err) {
                console.error("Error deleting image from S3:", err);
                return res.status(500).json({ message: "Failed to delete image from S3", error: err.message });
            }

            // Delete the image record from the database after successful S3 deletion
            await Image.findOneAndDelete({ url });

            res.status(200).json({ message: "Image deleted successfully" });
        });
    } catch (error) {
        console.error("Error deleting image:", error);
        res.status(500).json({ message: "Failed to delete image", error: error.message });
    }
};



// controllers/mediaController.js

export const deleteImageByUrl = async (req, res) => {
    const { url } = req.body; // Image URL from request body

    if (!url) {
        return res.status(400).json({ message: "Image URL is required" });
    }

    try {
        // Fetch the image from the database by URL
        const image = await Image.findOne({ url });
        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }

        const deleteParams = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: image.s3Key, 
        };

        // Delete the image from S3
        s3.deleteObject(deleteParams, async (err, data) => {
            if (err) {
                console.error("Error deleting image from S3:", err);
                return res.status(500).json({ message: "Failed to delete image from S3", error: err.message });
            }

            // Delete the image record from the database after successful S3 deletion
            await Image.findOneAndDelete({ url });

            res.status(200).json({ message: "Image deleted successfully" });
        });
    } catch (error) {
        console.error("Error deleting image:", error);
        res.status(500).json({ message: "Failed to delete image", error: error.message });
    }
};



export const deleteAllImages = async (req, res) => {
    try {
        const images = await Image.find(); 

        if (images.length === 0) {
            return res.status(404).json({ message: 'No images to delete' });
        }

        // Iterate over all images and delete each from S3
        const deletePromises = images.map(async (image) => {
            const params = {
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: image.s3Key 
            };

            // Log the params to verify the Key value
            console.log('Deleting S3 object with params:', params);

            try {
                await s3.deleteObject(params); 
            } catch (deleteErr) {
                console.error(`Error deleting image with s3Key ${image.s3Key}:`, deleteErr);
            }
        });

        await Promise.all(deletePromises); 

        // Remove all images from the database
        await Image.deleteMany();

        return res.status(200).json({ message: 'All images deleted successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Error deleting images', error: err.message });
    }
};









// video sections




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






// other trials options






// export const uploadVideo = (req, res) => {
//     const { serviceName, serviceDescription } = req.body;

//     if (!serviceName || !serviceDescription) {
//         return res.status(400).json({ message: 'Service name and description are required.' });
//     }

//     upload.single('video')(req, res, async (err) => {
//         if (err) {
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
//             // Upload to S3
//             await s3.putObject(params).promise();

//             // Save video metadata and service information to the database
//             const newVideo = new Videos({
//                 filename: req.file.originalname,
//                 url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${s3Key}`,
//                 s3Key,
//                 serviceName,
//                 serviceDescription,
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









// // export const getVideos = async (req, res) => {
// //     try {
// //         const videos = await Video.find(); // Fetch all videos from the database
// //         return res.status(200).json(videos); // Return videos as JSON
// //     } catch (err) {
// //         return res.status(500).json({ message: 'Error fetching videos', error: err.message });
// //     }
// // };

// export const getVideos = async (req, res) => {
//     try {
//         const videos = await Video.find(); // Fetch all videos without populate
//         return res.status(200).json(videos); // Return videos as JSON
//     } catch (err) {
//         return res.status(500).json({ message: 'Error fetching videos', error: err.message });
//     }
// };









// export const getVideoById = async (req, res) => {
//     try {
//         const video = await Video.findById(req.params.id); // Fetch video by ID
//         if (!video) {
//             return res.status(404).json({ message: 'Video not found' });
//         }
//         return res.status(200).json(video); // Return the video as JSON
//     } catch (err) {
//         return res.status(500).json({ message: 'Error fetching video', error: err.message });
//     }
// };






// export const deleteVideoById = async (req, res) => {
//     const { id } = req.params; // Assuming the ID is passed as a URL parameter

//     try {
//         // Fetch the video from the database by ID
//         const video = await Video.findById(id);

//         if (!video) {
//             return res.status(404).json({ message: 'Video not found' });
//         }

//         // Delete the video from S3
//         const deleteParams = {
//             Bucket: process.env.AWS_S3_BUCKET_NAME,
//             Key: video.s3Key, // Use the S3 key from the fetched video
//         };

//         await s3.deleteObject(deleteParams);

//         // Now delete the video record from the database
//         await Video.findByIdAndDelete(id);

//         return res.status(200).json({ message: 'Video deleted successfully' });
//     } catch (err) {
//         return res.status(500).json({ message: 'Error deleting video', error: err.message });
//     }
// };

// export const deleteAllVideos = async (req, res) => {
//     try {
//         const videos = await Video.find(); // Fetch all videos from the database

//         if (videos.length === 0) {
//             return res.status(404).json({ message: 'No videos to delete' });
//         }

//         // Iterate over all videos and delete each from S3
//         const deletePromises = videos.map(async (video) => {
//             const params = {
//                 Bucket: process.env.AWS_S3_BUCKET_NAME,
//                 Key: video.s3Key // Assuming the video document stores the S3 object key
//             };

//             // Log the params to verify the Key value
//             console.log('Deleting S3 object with params:', params);

//             try {
//                 await s3.deleteObject(params); // Directly use the deleteObject method
//             } catch (deleteErr) {
//                 console.error(`Error deleting video with s3Key ${video.s3Key}:`, deleteErr);
//             }
//         });

//         await Promise.all(deletePromises); // Wait for all videos to be deleted from S3

//         // Remove all videos from the database
//         await Video.deleteMany();

//         return res.status(200).json({ message: 'All videos deleted successfully' });
//     } catch (err) {
//         return res.status(500).json({ message: 'Error deleting videos', error: err.message });
//     }
// }



//Ending sections


















// export const deleteImageById = async (req, res) => {
//     const { id } = req.params; // Assuming the ID is passed as a URL parameter

//     try {
//         // Fetch the image from the database by ID
//         const image = await Image.findById(id);

//         if (!image) {
//             return res.status(404).json({ message: 'Image not found' });
//         }

//         // Delete the image from S3
//         const deleteParams = {
//             Bucket: process.env.AWS_S3_BUCKET_NAME,
//             Key: image.s3Key, // Use the S3 key from the fetched image
//         };

//         await s3.deleteObject(deleteParams);

//         // Now delete the image record from the database
//         await Image.findByIdAndDelete(id);

//         return res.status(200).json({ message: 'Image deleted successfully' });
//     } catch (err) {
//         return res.status(500).json({ message: 'Error deleting image', error: err.message });
//     }
// };






//💙
// export const deleteImage = async (req, res) => {
//     const { id } = req.params; // Image ID from request params

//     try {
//         // Fetch the image from the database to get the s3Key
//         const image = await Image.findById(id);
//         if (!image) {
//             return res.status(404).json({ message: "Image not found" });
//         }

//         const deleteParams = {
//             Bucket: process.env.AWS_S3_BUCKET_NAME,
//             Key: image.s3Key, // Use the s3Key from the image document
//         };

//         // Delete the image from S3 without using .promise()
//         s3.deleteObject(deleteParams, async (err, data) => {
//             if (err) {
//                 console.error("Error deleting image from S3:", err);
//                 return res.status(500).json({ message: "Failed to delete image from S3", error: err.message });
//             }

//             // Delete the image record from the database after successful S3 deletion
//             await Image.findByIdAndDelete(id);

//             res.status(200).json({ message: "Image deleted successfully" });
//         });
//     } catch (error) {
//         console.error("Error deleting image:", error);
//         res.status(500).json({ message: "Failed to delete image", error: error.message });
//     }
// };















// export const uploadVideo = (req, res) => {
//     upload.single('video')(req, res, async (err) => {
//         if (err) {
//             return res.status(400).json({ message: 'Error uploading video', error: err.message });
//         }

//         if (!req.file) {
//             return res.status(400).json({ message: 'No file uploaded' });
//         }

//         const params = {
//             Bucket: process.env.AWS_S3_BUCKET_NAME,
//             Key: `videos/${Date.now()}_${req.file.originalname}`, // Saving videos in a 'videos' folder
//             Body: req.file.buffer,
//             ContentType: req.file.mimetype,
//             // ACL: 'public-read', // Uncomment if public access is required
//         };

//         try {
//             await s3.putObject(params);

//             // Save the video URL to the database
//             const newVideo = new Video({
//                 filename: req.file.originalname,
//                 url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${params.Key}`,
//             });

//             await newVideo.save(); // Save to the database

//             return res.status(200).json({
//                 message: 'Video uploaded successfully!',
//                 url: newVideo.url, // Return the saved video URL
//             });
//         } catch (uploadErr) {
//             return res.status(500).json({ message: 'Error uploading to S3', error: uploadErr.message });
//         }
//     });
// };


// export const getVideos = async (req, res) => {
//     try {
//         const videos = await Video.find(); // Fetch all videos from the database
//         return res.status(200).json(videos); // Return videos as JSON
//     } catch (err) {
//         return res.status(500).json({ message: 'Error fetching videos', error: err.message });
//     }
// };


// export const getVideoById = async (req, res) => {
//     try {
//         const video = await Video.findById(req.params.id); // Fetch video by ID
//         if (!video) {
//             return res.status(404).json({ message: 'Video not found' });
//         }
//         return res.status(200).json(video); // Return the video as JSON
//     } catch (err) {
//         return res.status(500).json({ message: 'Error fetching video', error: err.message });
//     }
// }


// export const deleteVideoById = async (req, res) => {
//     try {
//         const video = await Video.findById(req.params.id); // Find video by ID
//         if (!video) {
//             return res.status(404).json({ message: 'Video not found' });
//         }

//         // AWS S3 delete parameters
//         const params = {
//             Bucket: process.env.AWS_S3_BUCKET_NAME,
//             Key: video.s3Key, // Assuming the video document stores the S3 object key
//         };

//         // Delete video from S3
//         await s3.deleteObject(params).promise();

//         // Remove the video from the database
//         await Video.findByIdAndDelete(req.params.id);

//         return res.status(200).json({ message: 'Video deleted successfully' });
//     } catch (err) {
//         return res.status(500).json({ message: 'Error deleting video', error: err.message });
//     }
// };



// export const deleteAllVideos = async (req, res) => {
//     try {
//         const videos = await Video.find(); // Fetch all videos from the database

//         if (videos.length === 0) {
//             return res.status(404).json({ message: 'No videos to delete' });
//         }

//         // Iterate over all videos and delete each from S3
//         const deletePromises = videos.map(async (video) => {
//             const params = {
//                 Bucket: process.env.AWS_S3_BUCKET_NAME,
//                 Key: video.s3Key, // Assuming the video document stores the S3 object key
//             };

//             await s3.deleteObject(params).promise(); // Delete each video from S3
//         });

//         await Promise.all(deletePromises); // Wait for all videos to be deleted from S3

//         // Remove all videos from the database
//         await Video.deleteMany();

//         return res.status(200).json({ message: 'All videos deleted successfully' });
//     } catch (err) {
//         return res.status(500).json({ message: 'Error deleting videos', error: err.message });
//     }
// };




//ending of video sections of working model




















// import multer from 'multer';
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
// import dotenv from 'dotenv';

// dotenv.config();

// const s3 = new S3Client({ region: process.env.AWS_REGION }); // Set your region

// const storage = multer.memoryStorage(); // Store files in memory
// const upload = multer({ storage }); // Configure multer with the memory storage



// // Upload image
// export const uploadImage = (req, res) => {
//     upload.single('image')(req, res, async (err) => {
//         if (err) {
//             return res.status(400).json({ message: 'Error uploading image', error: err.message });
//         }

//         if (!req.file) {
//             return res.status(400).json({ message: 'No file uploaded' });
//         }

//         const params = {
//             Bucket: process.env.AWS_S3_BUCKET_NAME,
//             Key: `images/${Date.now()}_${req.file.originalname}`,
//             Body: req.file.buffer,
//             ContentType: req.file.mimetype,
//             // ACL: 'public-read',
//         };

//         try {
//             await s3.putObject(params);
//             return res.status(200).json({
//                 message: 'Image uploaded successfully!',
//                 url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${params.Key}`,
//             });
//         } catch (uploadErr) {
//             return res.status(500).json({ message: 'Error uploading to S3', error: uploadErr.message });
//         }
//     });
// };




// // Upload video (similar to image)
// export const uploadVideo = (req, res) => {
//     upload.single('video')(req, res, async (err) => {
//         if (err) {
//             return res.status(400).json({ message: 'Error uploading video', error: err.message });
//         }

//         if (!req.file) {
//             return res.status(400).json({ message: 'No file uploaded' });
//         }

//         const params = {
//             Bucket: process.env.AWS_S3_BUCKET_NAME,
//             Key: `videos/${Date.now()}_${req.file.originalname}`,
//             Body: req.file.buffer,
//             ContentType: req.file.mimetype,
//             ACL: 'public-read',
//         };

//         try {
//             await s3.putObject(params);
//             return res.status(200).json({
//                 message: 'Video uploaded successfully!',
//                 url: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${params.Key}`,
//             });
//         } catch (uploadErr) {
//             return res.status(500).json({ message: 'Error uploading to S3', error: uploadErr.message });
//         }
//     });
// };



//camo

// // Controller to upload videos
// export const uploadVideo = (req, res) => {
//     upload.single('video')(req, res, async (err) => {
//         if (err) {
//             return res.status(400).json({ message: 'Error uploading video', error: err.message });
//         }
//         try {
//             const params = {
//                 Bucket: process.env.S3_BUCKET_NAME,
//                 Key: `videos/${Date.now()}_${req.file.originalname}`,
//                 Body: req.file.buffer,
//                 ContentType: req.file.mimetype,
//             };
//             const data = await s3.send(new PutObjectCommand(params));
//             res.status(200).json({ message: 'Video uploaded successfully!', data });
//         } catch (error) {
//             res.status(500).json({ message: 'Error uploading video', error });
//         }
//     });
// };






// import s3 from '../config/awsConfig.js';
// import { PutObjectCommand } from '@aws-sdk/client-s3';
// import Video from '../models/videoModel.js';
// import Image from '../models/imageModel.js';

// export const uploadMediaToS3 = async (req, res) => {
//     try {
//         const files = req.files; // Allow multiple files

//         // Handle multiple files
//         const uploadPromises = files.map(async (file) => {
//             const params = {
//                 Bucket: process.env.AWS_BUCKET_NAME,
//                 Key: `${file.fieldname}/${file.originalname}`, // Create a folder structure based on field name
//                 Body: file.buffer,
//                 ContentType: file.mimetype,
//             };

//             const command = new PutObjectCommand(params);
//             await s3.send(command);

//             // Save metadata to MongoDB
//             if (file.fieldname === 'video') {
//                 const newVideo = new Video({ title: file.originalname, url: params.Key });
//                 await newVideo.save();
//             } else if (file.fieldname === 'image') {
//                 const newImage = new Image({ title: file.originalname, url: params.Key });
//                 await newImage.save();
//             }
//         });

//         await Promise.all(uploadPromises);

//         res.status(200).json({ message: 'Media uploaded successfully!' });
//     } catch (error) {
//         res.status(500).json({ error: 'Error uploading media', details: error.message });
//     }
// };