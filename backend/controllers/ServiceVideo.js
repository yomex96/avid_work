import ServiceVideo from '../models/Service_Video.js';

export const saveVideoUrls = async (req, res) => {
  const { videoUrls } = req.body;

  try {
    // Validate input
    if (!Array.isArray(videoUrls) || videoUrls.length === 0 || videoUrls.length > 6) {
      return res.status(400).json({ error: "Provide between 1 and 6 video URLs." });
    }

    // Fetch all existing URLs in the database
    const existingEntries = await ServiceVideo.find();
    const existingUrls = existingEntries.flatMap(entry => entry.videoUrls);

    // Check if any of the new URLs already exist
    const duplicateUrls = videoUrls.filter(url => existingUrls.includes(url));
    if (duplicateUrls.length > 0) {
      return res.status(400).json({ error: `Duplicate URLs detected: ${duplicateUrls.join(', ')}` });
    }

    // Save new document
    const newVideoEntry = new ServiceVideo({ videoUrls });
    const savedVideo = await newVideoEntry.save();

    res.status(201).json(savedVideo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getVideoUrls = async (req, res) => {
    try {
      // Fetch all video entries (You can filter by userId if needed)
      const videos = await ServiceVideo.find();
  
      if (!videos.length) {
        return res.status(404).json({ error: 'No video URLs found.' });
      }
  
      // Return the fetched videos
      res.status(200).json(videos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
