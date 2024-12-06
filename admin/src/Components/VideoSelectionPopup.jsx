import { useState, useEffect } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { MdAdd } from 'react-icons/md';

const VideoSelectionPopup = ({ onClose, onSelectVideos }) => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedVideos, setSelectedVideos] = useState([]); // Store selected video URLs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch services on component mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/services/media-services');
        const data = await response.json();

        if (data && Array.isArray(data.mediaServices)) {
          setServices(data.mediaServices);  // Store full service data, including videos
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching services:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Handle video selection by URL
  const handleVideoSelect = (videoUrl) => {
    setSelectedVideos(prev => {
      const newSelectedVideos = prev.includes(videoUrl)
        ? prev.filter(url => url !== videoUrl) // Deselect video if already selected
        : [...prev, videoUrl];  // Add URL to selectedVideos
    
      // Log the selected video URLs to the console
      console.log("Selected Videos:", newSelectedVideos);
    
      return newSelectedVideos;
    });
  };

  // Handle final video selection and send selected video URLs
  const handleSelectVideos = () => {
    // Pass selected URLs to the parent component
    onSelectVideos(selectedVideos);
    onClose();
  };

  // Render loading state
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
          <p>Loading services...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
          <p className="text-red-500">Error: {error}</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[800px] h-[400px] shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Select Videos</h2>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-white rounded-full p-1 hover:bg-red-500"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Services List */}
          <div className="w-1/3 border-r overflow-y-auto">
            <div className="p-4">
              <h3 className="font-semibold mb-4">Services</h3>
              {services.map((service) => (
                <button
                  key={service._id}
                  onClick={() => setSelectedService(service)}
                  className={`w-full text-left p-2 flex justify-between items-center hover:bg-gray-100 ${
                    selectedService === service ? 'bg-gray-200' : ''
                  }`}
                >
                  {service.name}
                  <ChevronRight size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Videos List */}
          <div className="w-2/3 p-4 overflow-y-auto">
            {selectedService ? (
              <>
                <h3 className="font-semibold mb-4">{selectedService.name} Videos</h3>
                <div className="grid grid-cols-3 gap-4">
                  {selectedService.categories.flatMap(category =>
                    category.videos.map((video) => (
                      <div
                        key={video._id}
                        className={`relative cursor-pointer border-2 ${
                          selectedVideos.includes(video.url)
                            ? 'border-green-500'
                            : 'border-transparent'
                        }`}
                        onClick={() => handleVideoSelect(video.url)} // Use video.url for selection
                      >
                        <video
                          src={video.url}
                          className="w-full h-32 object-cover"
                          controls={false}
                        />
                        {selectedVideos.includes(video.url) && (  // Check if URL is selected
                          <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                            ✓
                          </div>
                        )}
                        <p className="text-sm truncate p-1">{video.filename}</p>
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              <p className="text-gray-500 text-center">
                Select a service to view its videos
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end">
          <button
            onClick={handleSelectVideos}
            disabled={selectedVideos.length === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              selectedVideos.length > 0
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <MdAdd />
            Add {selectedVideos.length > 0 ? `(${selectedVideos.length})` : ''} Videos
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoSelectionPopup;
