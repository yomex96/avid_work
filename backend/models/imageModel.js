// // models/ImageModel.js
// import mongoose from 'mongoose';

// const ImageSchema = new mongoose.Schema({
//     filename: { type: String, required: true }, // Original filename
//     url: { type: String, required: true }, // URL from S3
//     uploadedAt: { type: Date, default: Date.now } // Upload timestamp
// });

// export default mongoose.model('Image', ImageSchema);

// import mongoose from 'mongoose';

// const imageSchema = new mongoose.Schema({
//     filename: { type: String, required: true },
//     url: { type: String, required: true },
// });

// const Image = mongoose.models.Image || mongoose.model('Image', imageSchema); // Use existing model if it exists

// export default Image;


import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    url: { type: String, required: true },
    s3Key: { type: String, required: true },
}, { timestamps: true });

const Image = mongoose.model('Image', imageSchema);
export default Image;









// import mongoose from 'mongoose';

// const mediaSchema = new mongoose.Schema({
//   fileName: String,
//   fileType: String,
//   fileUrl: String,
//   uploadDate: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export default mongoose.model('Media', mediaSchema);
