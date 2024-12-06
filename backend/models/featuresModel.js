import mongoose from "mongoose";

const uniqueVideoSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,  // The `url` field is required
  },
});

const UniqueVideo = mongoose.model("UniqueVideo", uniqueVideoSchema);

export default UniqueVideo;



// s3_key sections

// import mongoose from "mongoose";

// import mongoose from 'mongoose';

// const uniqueVideoSchema = new mongoose.Schema({
//   s3Key: {
//     type: String,
//     required: true,  // The `s3Key` field is required
//     unique: true,    // Ensure `s3Key` is unique
//   },
// });

// const UniqueVideo = mongoose.model("UniqueVideo", uniqueVideoSchema);

// export default UniqueVideo;
