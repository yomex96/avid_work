//working above 💙

// import mongoose from 'mongoose';

// const VideoSchema = new mongoose.Schema({
//     filename: {
//         type: String,
//         required: true,
//     },
//     url: {
//         type: String,
//         required: true,
//     },
//     s3Key: {
//         type: String,
//         required: true,
//     },
// }, { timestamps: true });

// const Video = mongoose.model('Video', VideoSchema);

// export default Video;



//2

// import mongoose from 'mongoose';

// const videoSchema = new mongoose.Schema({
//     filename: {
//         type: String,
//         required: true,
//     },
//     url: {
//         type: String,
//         required: true,
//     },
//     s3Key: {
//         type: String,
//         required: true,
//     },
//     serviceName: {
//         type: String,
//         required: true,
//     },
//     serviceDescription: {
//         type: String,
//         required: true, 
//     }
// }, { timestamps: true }); 


// const Video = mongoose.model('Video', videoSchema);

// export default Video;


import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    s3Key: {
        type: String,
        required: true,
    },
    serviceName: {
        type: String,
        required: true, // Name of the service category (e.g., Lifestyle, Brand)
    },
    serviceDescription: {
        type: String,
        required: true, // Description of the service category
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Pre-save middleware to update the updatedAt field
videoSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});


const Video = mongoose.model('Video', videoSchema);

export default Video;
















// import mongoose from 'mongoose';

// const videoSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     description: { type: String },
//     videoUrl: { type: String, required: true }, // URL to the video in S3
//     createdAt: { type: Date, default: Date.now },
// });

// const Video = mongoose.model('Video', videoSchema);
// export default Video;