
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Define the MediaVideo schema (for each video)
const mediaVideoSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    url: { type: String, required: true },
    s3Key: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});




// Define the MediaService schema with Categories (subcategories)
const mediaServiceSchema = new mongoose.Schema({
    // serviceId: { type: String, default: () => uuidv4() }, // Custom service identifier
    serviceId: { type: String, default: () => uuidv4(), unique: true }, // Custom service identifier
    
    name: { type: String, required: true, unique: true },
    categories: [
        {
            categoryId: { type: String, default: () => uuidv4(), unique: false }, // Custom category identifier
            // categoryId: { type: String, default: () => uuidv4(), unique: true }, // Custom category identifier
           
            name: { type: String, required: true },
            description: { type: String, required: true },
            videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MediaVideo' }],

            // new added 
            categoriesname: { type: String }// Add the categoriesname field
        }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Create models from schemas with custom names
const MediaService = mongoose.models.MediaService || mongoose.model('MediaService', mediaServiceSchema);
const MediaVideo = mongoose.models.MediaVideo || mongoose.model('MediaVideo', mediaVideoSchema);

export { MediaService, MediaVideo };




// import mongoose from 'mongoose';

// // Video schema for each video
// const videoSchema = new mongoose.Schema({
//     filename: { type: String, required: true },   
//     url: { type: String, required: true },        
//     s3Key: { type: String, required: true },      
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now }
// });



// // Service schema with subcategories
// const serviceSchema = new mongoose.Schema({
//     name: { type: String, required: true, unique: true },
//     // description: { type: String, required: true },         
//     subcategories: [
//         {
//             name: { type: String, required: true },           
//             description: { type: String, required: true },    
//             videos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }] 
//         }
//     ],
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now }
// });

// // Create models from schemas
// const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);
// const Video = mongoose.models.Video || mongoose.model('Video', videoSchema);

// export { Service, Video };