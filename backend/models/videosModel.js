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

// Specify a different collection within the same database
const Videos = mongoose.models.Videos || mongoose.model('Videos', videoSchema, 'custom_video_collection');

export default Videos;