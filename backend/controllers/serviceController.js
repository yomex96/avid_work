

// import { MediaService } from '../models/serviceModel.js';

import { MediaService, MediaVideo } from '../models/serviceModel.js';



//might not be useful

// // Create a media service name
// export const createMediaServiceName = async (req, res) => {
//   const { name } = req.body;

//   if (!name) {
//     return res.status(400).json({ message: 'Service name is required.' });
//   }

//   try {
//     // Check if the service name already exists
//     const existingService = await MediaService.findOne({ name });

//     if (existingService) {
//       return res.status(409).json({
//         message: `A media service with the name "${name}" already exists. Please use a different name.`,
//       });
//     }

//     // Create new media service with name only
//     const newService = new MediaService({ name });
//     await newService.save();

//     return res.status(201).json({
//       message: 'Media service name created successfully!',
//       mediaService: newService,
//     });
//   } catch (err) {
//     console.error('Error creating media service name:', err);
//     return res.status(500).json({
//       message: 'Error creating media service name',
//       error: err.message,
//     });
//   }
// };



//leading trail space issue


// export const createMediaServiceName = async (req, res) => {
//   const { name, categories = [] } = req.body; // Default categories to an empty array if not provided

//   if (!name) {
//     return res.status(400).json({ message: 'Service name is required.' });
//   }

//   try {
//     // Check if the service name already exists
//     const existingService = await MediaService.findOne({ name });

//     if (existingService) {
//       return res.status(409).json({
//         message: `A media service with the name "${name}" already exists. Please use a different name.`,
//       });
//     }

//     // If no categories are provided, set a default category using the provided name
//     if (categories.length === 0) {
//       categories.push({
//         name: name, 
//         description: `${name} `, 
//         categoriesname: name, 
//       });
//     }

//     // Validate the category fields if needed (you can skip categoryId validation)
//     for (const category of categories) {
//       if (!category.name || category.name === null) {
//         return res.status(400).json({
//           message: 'One or more categories have a missing or null name. Please ensure all categories have a valid name.',
//         });
//       }
//     }

//     // Create the new media service with valid categories and name
//     const newService = new MediaService({
//       name,
//       categories, // Categories should already be validated
//     });

//     // Save the new service to the database
//     await newService.save();

//     return res.status(201).json({
//       message: 'Media service name created successfully!',
//       mediaService: newService,
//     });
//   } catch (err) {
//     // Handle any errors
//     console.error('Error creating media service name:', err);
//     return res.status(500).json({
//       message: 'Error creating media service name',
//       error: err.message,
//     });
//   }
// };


export const createMediaServiceName = async (req, res) => {
  let { name, categories = [] } = req.body; // Default categories to an empty array if not provided

  // Trim any leading or trailing spaces from the name
  name = name.trim();

  if (!name) {
    return res.status(400).json({ message: 'Service name is required.' });
  }

  try {
    // Check if the service name already exists
    const existingService = await MediaService.findOne({ name });

    if (existingService) {
      return res.status(409).json({
        message: `A media service with the name "${name}" already exists. Please use a different name.`,
      });
    }

    // If no categories are provided, set a default category using the provided name
    if (categories.length === 0) {
      categories.push({
        name: name, 
        description: `${name} `, 
        categoriesname: name, 
      });
    }

    // Validate the category fields if needed (you can skip categoryId validation)
    for (const category of categories) {
      if (!category.name || category.name === null) {
        return res.status(400).json({
          message: 'One or more categories have a missing or null name. Please ensure all categories have a valid name.',
        });
      }
    }

    // Create the new media service with valid categories and name
    const newService = new MediaService({
      name,
      categories, // Categories should already be validated
    });

    // Save the new service to the database
    await newService.save();

    return res.status(201).json({
      message: 'Media service name created successfully!',
      mediaService: newService,
    });
  } catch (err) {
    // Handle any errors
    console.error('Error creating media service name:', err);
    return res.status(500).json({
      message: 'Error creating media service name',
      error: err.message,
    });
  }
};


// export const createMediaServiceName = async (req, res) => {
//   const { name, categories = [] } = req.body; // Default categories to an empty array if not provided

//   if (!name) {
//     return res.status(400).json({ message: 'Service name is required.' });
//   }

//   try {
//     // Check if the service name already exists
//     const existingService = await MediaService.findOne({ name });

//     if (existingService) {
//       return res.status(409).json({
//         message: `A media service with the name "${name}" already exists. Please use a different name.`,
//       });
//     }

//     // Check if any category has a null categoryId
//     if (categories.length > 0) {
//       for (const category of categories) {
//         if (!category.categoryId || category.categoryId === null) {
//           return res.status(400).json({
//             message: 'One or more categorie fields have a missing or null . Please ensure all categories name and descriptions are filled.',
//           });
//         }
//       }
//     }

//     // Create the new media service with valid categories and name
//     const newService = new MediaService({
//       name,
//       categories, // Categories should already be validated
//     });

//     // Save the new service to the database
//     await newService.save();

//     return res.status(201).json({
//       message: 'Media service name created successfully!',
//       mediaService: newService,
//     });
//   } catch (err) {
//     // Check for MongoDB error related to duplicate categoryId
//     if (err.code === 11000 && err.message.includes('duplicate key error')) {
//       return res.status(400).json({
//         // message: 'Duplicate categoryId detected.',
//         error: 'Please fill in the name and service description shouldnt be empty, A category with the same categoryId already exists.',
//       });
//     }

//     // Handle any other errors
//     console.error('Error creating media service name:', err);
//     return res.status(500).json({
//       message: 'Error creating media service name',
//       error: err.message,
//     });
//   }
// };








//not for put

// // Add categories to an existing media service
// export const addCategoriesToMediaService = async (req, res) => {
//   const { name, categories } = req.body;

//   // Validation for name and categories
//   if (!name || !categories || categories.length === 0) {
//     return res.status(400).json({ message: 'Service name and at least one category are required.' });
//   }

//   try {
//     // Find the media service by name
//     const mediaService = await MediaService.findOne({ name });

//     if (!mediaService) {
//       return res.status(404).json({ message: 'Media service not found.' });
//     }

//     // Add categoriesname to each category based on the media service name
//     const updatedCategories = categories.map(category => {
//       return {
//         ...category,
//         categoriesname: mediaService.name  // Set categoriesname to the service name automatically
//       };
//     });

//     // Add the updated categories with categoriesname field
//     mediaService.categories = [...mediaService.categories, ...updatedCategories];
//     await mediaService.save();

//     return res.status(200).json({
//       message: 'Categories added successfully!',
//       mediaService,
//     });
//   } catch (err) {
//     console.error('Error adding categories:', err);
//     return res.status(500).json({
//       message: 'Error adding categories to media service',
//       error: err.message,
//     });
//   }
// };



import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 to generate new UUIDs

// Add categories to an existing media service
export const addCategoriesToMediaService = async (req, res) => {
  const { name, categories } = req.body;

  // Validation for name and categories
  if (!name || !categories || categories.length === 0) {
    return res.status(400).json({ message: 'Service name and at least one category are required.' });
  }

  try {
    // Find the media service by name
    const mediaService = await MediaService.findOne({ name });

    if (!mediaService) {
      return res.status(404).json({ message: 'Media service not found.' });
    }

    // Ensure all categories have a valid categoryId, else assign one
    const updatedCategories = categories.map(category => {
      return {
        ...category,
        categoryId: category.categoryId || uuidv4(), // If categoryId is null or missing, assign a valid UUID
        categoriesname: mediaService.name  // Set categoriesname to the service name automatically
      };
    });

    // Add the updated categories with categoryId and categoriesname fields
    mediaService.categories = [...mediaService.categories, ...updatedCategories];
    await mediaService.save();

    return res.status(200).json({
      message: 'Categories added successfully!',
      mediaService,
    });
  } catch (err) {
    console.error('Error adding categories:', err);
    return res.status(500).json({
      message: 'Error adding categories to media service',
      error: err.message,
    });
  }
};




//Original case 💙

export const createMediaService = async (req, res) => {
  const { name, categories } = req.body;

  if (!name || !categories || categories.length === 0) {
    return res.status(400).json({ message: 'Service name and at least one category are required.' });
  }

  try {
    const newService = new MediaService({ name, categories });

    await newService.save();

    return res.status(201).json({
      message: 'Media Service created successfully!',
      mediaService: newService,
    });
  } catch (err) {
    if (err.code === 11000 && err.keyPattern?.name) {
      return res.status(409).json({
        message: `A media service with the name "${name}" already exists. Please use a different name.`,
      });
    }
    console.error('Error creating media service:', err);
    return res.status(500).json({
      message: 'Error creating media service',
      error: err.message,
    });
  }
};


// Controller function to get media service names, category names, and video URLs
export const getServiceNames = async (req, res) => {
  try {
    // Fetch all media services and populate videos in categories
    const mediaServices = await MediaService.find()
      .populate({
        path: 'categories.videos', // Assuming videos is a reference to another collection, if not skip this.
        select: 'url' // Select only the 'url' field from videos
      });

    // If no media services are found, return an empty response
    if (!mediaServices.length) {
      return res.status(404).json({
        message: 'No media services found!',
      });
    }

    res.status(200).json({
      message: 'Media Services retrieved successfully!',
      mediaServices,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving media services',
      error: error.message,
    });
  }
};

// Fetch the service details and video URLs based on service name
export const getServiceVideos = async (req, res) => {
  try {
    // Extract the service name from params
    const { serviceName } = req.params;

    // Create a regex pattern to allow partial, case-insensitive matches
    const regex = new RegExp(serviceName, 'i'); // Matches any string containing 'serviceName' (case-insensitive)

    // Search for the service using the regex
    const service = await MediaService.findOne({ name: { $regex: regex } }).populate({
      path: 'categories',
      populate: {
        path: 'videos',
        select: 'filename url s3Key createdAt', // Only select the fields we need
      },
    });

    // Handle service not found
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Extract video details along with category name
    const videoDetails = service.categories.flatMap((category) =>
      category.videos.map((video) => ({
        categoryName: category.name, // Include the category name
        url: video.url,
        s3Key: video.s3Key,
        filename: video.filename,
        createdAt: video.createdAt,
      }))
    );

    // Return the list of video details in the response
    return res.status(200).json({ videoDetails });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};


// // Fetch the service details and video URLs based on service name
// export const getServiceVideos = async (req, res) => {
//   try {
//     // Extract the service name from params
//     const { serviceName } = req.params;

//     // Create a regex pattern to allow partial, case-insensitive matches
//     const regex = new RegExp(serviceName, 'i'); // Matches any string containing 'serviceName' (case-insensitive)

//     // Search for the service using the regex
//     const service = await MediaService.findOne({ name: { $regex: regex } }).populate({
//       path: 'categories',
//       populate: {
//         path: 'videos',
//         select: 'filename url', // Only select the fields we need
//       },
//     });

//     // Handle service not found
//     if (!service) {
//       return res.status(404).json({ message: 'Service not found' });
//     }

//     // Extract the video URLs from the service's categories and videos
//     const videoUrls = service.categories.flatMap((category) =>
//       category.videos.map((video) => video.url)
//     );

//     // Return the list of video URLs in the response
//     return res.status(200).json({ videoUrls });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// };



// old model 
// //new must be used 

// // Controller function to get media service names
// export const getServiceNames = async (req, res) => {
//   try {
//     const mediaServices = await MediaService.find({}, 'name'); // Fetch only the 'name' field
//     res.status(200).json({
//       message: 'Media Services retrieved successfully!',
//       mediaServices,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: 'Error retrieving media services',
//       error: error.message,
//     });
//   }
// };




// export const getMediaServices = async (req, res) => {
//   try {
//     const mediaServices = await MediaService.find().populate({
//       path: 'categories.videos',
//       model: 'Video',
//     });

//     return res.status(200).json({
//       message: 'Media Services retrieved successfully!',
//       mediaServices,
//     });
//   } catch (err) {
//     console.error('Error fetching media services:', err);
//     return res.status(500).json({ message: 'Error fetching media services', error: err.message });
//   }
// };



//It help populate the video information.. Be sure before deleting

export const getMediaServices = async (req, res) => {
  try {
    const mediaServices = await MediaService.find().populate({
      path: 'categories.videos',
      model: 'MediaVideo',  
    });

    return res.status(200).json({
      message: 'Media Services retrieved successfully!',
      mediaServices,
    });
  } catch (err) {
    console.error('Error fetching media services:', err);
    return res.status(500).json({ message: 'Error fetching media services', error: err.message });
  }
};






export const getCategory = async (req, res) => {
  const { serviceId, categoryId } = req.params;

  try {
    // Find the media service by serviceId
    const mediaService = await MediaService.findOne({ serviceId });
    if (!mediaService) {
      return res.status(404).json({ message: 'Media Service not found.' });
    }

    // Find the specific category within the media service by categoryId
    const category = mediaService.categories.find(cat => cat.categoryId === categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    // Fetch the details of each video by their IDs (from category.videos)
    const videoDetails = await MediaVideo.find({ '_id': { $in: category.videos } });

    // Return the category along with detailed video information
    return res.status(200).json({
      message: 'Category retrieved successfully!',
      category: {
        ...category._doc, // Spread the category data
        videos: videoDetails, // Add the full video details to the response
      },
    });
  } catch (err) {
    console.error('Error fetching category:', err);
    return res.status(500).json({ message: 'Error fetching category', error: err.message });
  }
};




// very important 

export const getServiceDetails = async (req, res) => {
  try {
    // Extract the serviceId from params
    const { serviceId } = req.params;

    // Validate serviceId as a UUID
    if (!isValidUUID(serviceId)) {
      return res.status(400).json({ message: 'Invalid service ID format' });
    }

    // Find the service by serviceId (UUID), not by ObjectId (_id)
    const service = await MediaService.findOne({ serviceId }).populate({
      path: 'categories',
      populate: {
        path: 'videos', // Assuming 'videos' is a sub-collection
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
        categoryId: category.categoryId, // Including categoryId in response
      })),
    };

    res.status(200).json(serviceDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper function to validate UUID format
const isValidUUID = (str) => {
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return uuidRegex.test(str);
};


// very important details  for showing services  💙

// export const getServiceDetailsbyname = async (req, res) => {
//   try {
//     // Extract the service name from params
//     const { name } = req.params;

//     // Find the service by name (case-insensitive)
//     const service = await MediaService.findOne({ name: new RegExp(`^${name}$`, 'i') }).populate({
//       path: 'categories',
//       populate: {
//         path: 'videos', 
//         select: 'filename url',
//       },
//     });

//     if (!service) {
//       return res.status(404).json({ message: 'Service not found' });
//     }

//     // Send the service details and populated categories and videos
//     const serviceDetails = {
//       name: service.name,
//       categories: service.categories.map(category => ({
//         name: category.name,
//         description: category.description,
//         videos: category.videos.map(video => ({
//           filename: video.filename,
//           url: video.url,
//         })),
//         categoryId: category.categoryId, 
//       })),
//     };

//     res.status(200).json(serviceDetails);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// part2
export const getServiceDetailsbyname = async (req, res) => {
  try {
    // Extract the service name from params
    const { name } = req.params;

    // Create a regex pattern to allow partial, case-insensitive matches
    const regex = new RegExp(name, "i"); // Matches any string containing 'name' (case-insensitive)

    // Search for the service using the regex
    const service = await MediaService.findOne({ name: { $regex: regex } }).populate({
      path: 'categories',
      populate: {
        path: 'videos',
        select: 'filename url',
      },
    });

    // Handle service not found
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Prepare the service details response
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

export const updateMediaServiceName = async (req, res) => {
  const { serviceName } = req.params; // Use serviceName from the route parameters
  const { name } = req.body; // New name to update

  // Validate inputs
  if (!serviceName) {
    return res.status(400).json({ message: 'Original service name is required.' });
  }

  if (!name) {
    return res.status(400).json({ message: 'New service name is required.' });
  }

  try {
    // Find the media service by the current service name
    const mediaService = await MediaService.findOne({ name: serviceName });

    if (!mediaService) {
      return res.status(404).json({ message: 'Media Service not found.' });
    }

    // Update the name
    mediaService.name = name;
    await mediaService.save();

    return res.status(200).json({
      message: 'Media Service name updated successfully!',
      mediaService,
    });
  } catch (err) {
    console.error('Error updating media service name:', err);
    return res.status(500).json({
      message: 'Error updating media service name',
      error: err.message,
    });
  }
};


// export const updateCategory = async (req, res) => {
//   const { mediaServiceName, categoriesname } = req.params; // Use mediaServiceName and categoriesname from the route parameters
//   const { name, description } = req.body; // New name and description for the category

//   // Validate input
//   if (!name || !description) {
//     return res.status(400).json({ message: 'Category name and description are required.' });
//   }

//   try {
//     // Find the media service by name
//     const mediaService = await MediaService.findOne({ name: mediaServiceName });
//     if (!mediaService) {
//       return res.status(404).json({ message: 'Media Service not found.' });
//     }

//     // Find the category by categoriesname
//     const category = mediaService.categories.find(cat => cat.name === categoriesname);
//     if (!category) {
//       return res.status(404).json({ message: 'Category not found.' });
//     }

//     // Update the category
//     category.name = name;
//     category.description = description;

//     // Save updated media service
//     await mediaService.save();

//     return res.status(200).json({
//       message: 'Category updated successfully!',
//       mediaService,
//     });
//   } catch (err) {
//     console.error('Error updating category:', err);
//     return res.status(500).json({
//       message: 'Error updating category',
//       error: err.message,
//     });
//   }
// };

// updated version for the name and description edit
export const updateCategory = async (req, res) => {
  const { mediaServiceName, categoriesname } = req.params; // Use mediaServiceName and categoriesname from the route parameters
  const { name, description } = req.body; // New name and description for the category

  // Validate input
  if (!name || !description) {
    return res.status(400).json({ message: 'Category name and description are required.' });
  }

  try {
    // Find the media service by name
    const mediaService = await MediaService.findOne({ name: mediaServiceName });
    if (!mediaService) {
      return res.status(404).json({ message: 'Media Service not found.' });
    }

    console.log('Media Service:', mediaService);

    // Find the category by categoriesname
    const category = mediaService.categories.find(cat => cat.categoriesname === categoriesname);
    if (!category) {
      console.error('Categories in Media Service:', mediaService.categories);
      return res.status(404).json({ message: 'Category not found.' });
    }

    // Update the category
    category.name = name;
    category.description = description;

    // Save updated media service
    await mediaService.save();

    return res.status(200).json({
      message: 'Category updated successfully!',
      mediaService,
    });
  } catch (err) {
    console.error('Error updating category:', err);
    return res.status(500).json({
      message: 'Error updating category',
      error: err.message,
    });
  }
};

export const deleteMediaServiceByName = async (req, res) => {
  const { serviceName } = req.params;

  try {
    console.log('Service name received:', serviceName);

    if (!serviceName) {
      return res.status(400).json({ message: 'Service name is required.' });
    }

    // Use a case-insensitive query to delete the service
    const mediaService = await MediaService.findOneAndDelete({
      name: { $regex: `^${serviceName}$`, $options: 'i' },
    });

    if (!mediaService) {
      return res.status(404).json({ message: 'Media Service not found.' });
    }

    return res.status(200).json({
      message: 'Media Service deleted successfully!',
      mediaService,
    });
  } catch (err) {
    console.error('Error deleting media service:', err);
    return res.status(500).json({ message: 'Error deleting media service', error: err.message });
  }
};





// export const updateMediaServiceName = async (req, res) => {
//   const { serviceId } = req.params;
//   const { name } = req.body;

//   if (!name) {
//     return res.status(400).json({ message: 'Service name is required.' });
//   }

//   try {
//     const updatedService = await MediaService.findOneAndUpdate(
//       { serviceId }, // Find by custom `serviceId`
//       { name },
//       { new: true }
//     );

//     if (!updatedService) {
//       return res.status(404).json({ message: 'Media Service not found.' });
//     }

//     return res.status(200).json({
//       message: 'Media Service name updated successfully!',
//       mediaService: updatedService,
//     });
//   } catch (err) {
//     console.error('Error updating media service name:', err);
//     return res.status(500).json({ message: 'Error updating media service name', error: err.message });
//   }
// };






// Delete Media Service
export const deleteMediaService = async (req, res) => {
  const { serviceId } = req.params;

  try {
    // Find and delete the MediaService by serviceId
    const mediaService = await MediaService.findOneAndDelete({ serviceId });
    
    if (!mediaService) {
      return res.status(404).json({ message: 'Media Service not found.' });
    }

    return res.status(200).json({
      message: 'Media Service deleted successfully!',
      mediaService,  
    });
  } catch (err) {
    console.error('Error deleting media service:', err);
    return res.status(500).json({ message: 'Error deleting media service', error: err.message });
  }
};









// Delete Category from a Media Service
export const deleteCategory = async (req, res) => {
  const { serviceId, categoryId } = req.params;

  try {
    // Find the MediaService by serviceId
    const mediaService = await MediaService.findOne({ serviceId });
    if (!mediaService) {
      return res.status(404).json({ message: 'Media Service not found.' });
    }

    // Find the category by categoryId
    const categoryIndex = mediaService.categories.findIndex(cat => cat.categoryId === categoryId);
    if (categoryIndex === -1) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    // Remove the category from the categories array
    mediaService.categories.splice(categoryIndex, 1);

    // Save the updated media service
    await mediaService.save();

    return res.status(200).json({
      message: 'Category deleted successfully!',
      mediaService,  
    });
  } catch (err) {
    console.error('Error deleting category:', err);
    return res.status(500).json({ message: 'Error deleting category', error: err.message });
  }
};


export const deleteAllMediaServices = async (req, res) => {
  try {
    // Delete all MediaServices
    const result = await MediaService.deleteMany({}); 
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No media services found to delete.' });
    }

    return res.status(200).json({
      message: `${result.deletedCount} media services deleted successfully!`,
    });
  } catch (err) {
    console.error('Error deleting all media services:', err);
    return res.status(500).json({ message: 'Error deleting media services', error: err.message });
  }
};



export const updateMediaServiceNames = async (req, res) => {
  const { currentName } = req.params; // Current name of the service
  const { name } = req.body; // New name to update the service to

  if (!name) {
    return res.status(400).json({ message: 'New service name is required.' });
  }

  try {
    // Check if a service with the current name exists
    const mediaService = await MediaService.findOne({ name: currentName });
    if (!mediaService) {
      return res.status(404).json({ message: 'Media Service not found.' });
    }

    // Check if a service with the new name already exists
    const existingService = await MediaService.findOne({ name });
    if (existingService) {
      return res.status(409).json({
        message: `A media service with the name "${name}" already exists. Please choose a different name.`,
      });
    }

    // Update the service name
    mediaService.name = name;
    await mediaService.save();

    return res.status(200).json({
      message: 'Media service name updated successfully!',
      mediaService,
    });
  } catch (err) {
    console.error('Error updating media service name:', err);
    return res.status(500).json({
      message: 'Error updating media service name',
      error: err.message,
    });
  }
};





// controllers/serviceController.js

// import { Service } from '../models/serviceModel.js';

// export const createService = async (req, res) => {
//     const { name, description, subcategories } = req.body;

//     if (!name || !description || !subcategories || subcategories.length === 0) {
//         return res.status(400).json({ message: 'Service name, description, and subcategories are required.' });
//     }

//     try {
//         // Create a new service object with subcategories
//         const newService = new Service({
//             name,
//             description,
//             subcategories,
//         });

//         // Save the service in the database
//         await newService.save();

//         return res.status(201).json({
//             message: 'Service created successfully!',
//             service: newService,
//         });
//     } catch (err) {
//         console.error('Error creating service:', err);
//         return res.status(500).json({ message: 'Error creating service', error: err.message });
//     }
// };

// import { MediaService } from '../models/serviceModel.js';


// working

// import { MediaService } from '../models/serviceModel.js';
// export const createMediaService = async (req, res) => {
//   const { name, categories } = req.body;

//   if (!name || !categories || categories.length === 0) {
//       return res.status(400).json({ message: 'Service name and at least one category are required.' });
//   }

//   try {
//       const newService = new MediaService({
//           name,
//           categories,
//       });

//       await newService.save();

//       return res.status(201).json({
//           message: 'Media Service created successfully!',
//           mediaService: newService,
//       });
//   } catch (err) {
//       // Check for duplicate key error
//       if (err.code === 11000 && err.keyPattern && err.keyPattern.name) {
//           return res.status(409).json({
//               message: `A media service with the name "${name}" already exists. Please use a different name.`,
//           });
//       }

//       console.error('Error creating media service:', err);
//       return res.status(500).json({
//           message: 'Error creating media service',
//           error: err.message,
//       });
//   }
// };



// export const getMediaServices = async (req, res) => {
//   try {
//       // Fetch all media services and populate categories and videos within them
//       const mediaServices = await MediaService.find().populate({
//           path: 'categories.videos', // Populate videos in each category
//           model: 'Video' // Reference the Video model
//       });

//       return res.status(200).json({
//           message: 'Media Services retrieved successfully!',
//           mediaServices
//       });
//   } catch (err) {
//       console.error('Error fetching media services:', err);
//       return res.status(500).json({ message: 'Error fetching media services', error: err.message });
//   }
// };


// // Update media service name
// export const updateMediaServiceName = async (req, res) => {
//   const { serviceId } = req.params;
//   const { name } = req.body;

//   if (!name) {
//       return res.status(400).json({ message: 'Service name is required.' });
//   }

//   try {
//       // Find the service by ID and update the name
//       const updatedService = await MediaService.findByIdAndUpdate(
//           serviceId,
//           { name },
//           { new: true }
//       );

//       if (!updatedService) {
//           return res.status(404).json({ message: 'Media Service not found.' });
//       }

//       return res.status(200).json({
//           message: 'Media Service name updated successfully!',
//           mediaService: updatedService,
//       });
//   } catch (err) {
//       console.error('Error updating media service name:', err);
//       return res.status(500).json({ message: 'Error updating media service name', error: err.message });
//   }
// };


// // controllers/mediaServiceController.js

// export const updateCategory = async (req, res) => {
//   const { serviceId, categoryId } = req.params;
//   const { name, description } = req.body;

//   if (!name || !description) {
//       return res.status(400).json({ message: 'Category name and description are required.' });
//   }

//   try {
//       // Find the service and category to update
//       const mediaService = await MediaService.findById(serviceId);
//       if (!mediaService) {
//           return res.status(404).json({ message: 'Media Service not found.' });
//       }

//       const category = mediaService.categories.id(categoryId);
//       if (!category) {
//           return res.status(404).json({ message: 'Category not found.' });
//       }

//       // Update category name and description
//       category.name = name;
//       category.description = description;

//       // Save the updated media service document
//       await mediaService.save();

//       return res.status(200).json({
//           message: 'Category updated successfully!',
//           mediaService,
//       });
//   } catch (err) {
//       console.error('Error updating category:', err);
//       return res.status(500).json({ message: 'Error updating category', error: err.message });
//   }
// };