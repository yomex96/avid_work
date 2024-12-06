
import { useState, useEffect } from "react";
import { ChevronRight, Trash2, X } from "lucide-react";
import { MdAdd } from "react-icons/md";
import DeletePopUp from "../Components/DeletePopUp";
import { toast } from "react-hot-toast";

const Services = () => {
  const [contentChanged, setContentChanged] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "", media: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [services, setServices] = useState([]);
  const [newServiceName, setNewServiceName] = useState("");
  const [showNewServiceForm, setShowNewServiceForm] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [showAddMediaModal, setShowAddMediaModal] = useState(false);
  const [mediaData, setMediaData] = useState({ name: "", description: "", file: null });

  // Load services from localStorage when the component mounts
  useEffect(() => {
    const savedServices = localStorage.getItem("services");
    if (savedServices) {
      setServices(JSON.parse(savedServices));
    }
  }, []);

  const handleButtonClick = (service) => {
    setContentChanged(true);
    setSelectedService(service);
    const savedData = localStorage.getItem(`${service.name}_data`);
    setFormData(
      savedData
        ? JSON.parse(savedData)
        : { name: service.name, description: service.description || "", media: service.media || [] }
    );
  };

  const handleBackClick = () => {
    setContentChanged(false);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing((prev) => !prev);
    if (isEditing) {
      localStorage.setItem(`${selectedService.name}_data`, JSON.stringify(formData));
      const updatedServices = services.map((service) =>
        service.name === selectedService.name ? { ...service, ...formData } : service
      );
      setServices(updatedServices);
      localStorage.setItem("services", JSON.stringify(updatedServices));
      toast.success("Service updated successfully!");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleAddNewService = () => {
    if (newServiceName.trim()) {
      const newService = { name: newServiceName, media: [] };
      const updatedServices = [...services, newService];
      setServices(updatedServices);
      setNewServiceName("");
      setShowNewServiceForm(false);
      localStorage.setItem("services", JSON.stringify(updatedServices));
      toast.success("New service added successfully!");
    }
  };

  const handleRemoveService = (serviceName) => {
    setServiceToDelete(serviceName);
    setShowDeletePopup(true);
  };

  const confirmDeleteService = () => {
    const updatedServices = services.filter((service) => service.name !== serviceToDelete);
    setServices(updatedServices);
    setShowDeletePopup(false);
    setServiceToDelete(null);
    localStorage.setItem("services", JSON.stringify(updatedServices));
    toast.success("Service deleted successfully!");
  };

  const cancelDeleteService = () => {
    setShowDeletePopup(false);
    setServiceToDelete(null);
  };

  const handleAddMedia = () => {
    setShowAddMediaModal(true);
  };

  const handleMediaInputChange = (e) => {
    const { name, value } = e.target;
    setMediaData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setMediaData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleCloseModal = () => {
    setShowAddMediaModal(false);
    setMediaData({ name: "", description: "", file: null });
  };

  const handleSaveMedia = () => {
    if (!mediaData.file) {
      toast.error("Please select a file.");
      return;
    }

    const newMedia = {
      ...mediaData,
      file: URL.createObjectURL(mediaData.file), // Create a URL for the file
      type: mediaData.file.type,
    };

    // Update the formData with the new media item
    const updatedFormData = {
      ...formData,
      media: [...formData.media, newMedia],
    };

    setFormData(updatedFormData);

    // Update the selected service with the new media
    const updatedService = {
      ...selectedService,
      media: [...selectedService.media, newMedia],
    };
    setSelectedService(updatedService);

    const updatedServices = services.map((service) =>
      service.name === selectedService.name ? updatedService : service
    );

    setServices(updatedServices);
    localStorage.setItem("services", JSON.stringify(updatedServices)); // Update localStorage
    setShowAddMediaModal(false); // Close modal after saving
    setMediaData({ name: "", description: "", file: null }); // Reset media data
    toast.success("Media added successfully!");
  };

  if (contentChanged) {
    return (
      <div className="p-4">
        <div className="flex items-center mb-4">
          <button onClick={handleBackClick} className="text-black font-bold">
            Services
          </button>
          <ChevronRight className="mx-2" />
          <span className="font-bold">{selectedService.name}</span>
        </div>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="border p-2 rounded w-full"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Service Description"
            disabled={!isEditing}
            className="border p-2 rounded w-full"
          />

          <button
            onClick={handleEditClick}
            className={`px-4 py-2 text-white rounded ${isEditing ? "bg-green-600" : "bg-blue-600"}`}
          >
            {isEditing ? "Save" : "Edit"}
          </button>

          <button
            onClick={handleAddMedia}
            className="px-4 py-2 mt-2 bg-gray-800 text-white rounded"
          >
            Add Media
          </button>

          {formData.media && formData.media.length > 0 && (
            <div className="mt-4 grid grid-cols-4 gap-4">
              {formData.media.map((media, index) => (
                <div key={index} className="flex flex-col items-center">
                  {media.type.startsWith("image/") ? (
                    <img src={media.file} alt={media.name} className="w-full h-32 object-cover rounded" />
                  ) : (
                    <video controls className="w-full h-32 rounded">
                      <source src={media.file} type={media.type} />
                    </video>
                  )}
                  <p className="text-sm mt-2 text-center">{media.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {showAddMediaModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 relative">
              <X
                onClick={handleCloseModal}
                className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-black"
              />
              <h2 className="text-xl font-bold mb-4">Add Media</h2>

              <input
                type="text"
                name="name"
                value={mediaData.name}
                onChange={handleMediaInputChange}
                placeholder="Media Name"
                className="border p-2 rounded w-full mb-4"
              />

              <textarea
                name="description"
                value={mediaData.description}
                onChange={handleMediaInputChange}
                placeholder="Media Description"
                className="border p-2 rounded w-full mb-4"
              />

              <input
                type="file"
                onChange={handleFileChange}
                className="border p-2 rounded w-full"
              />

              <button
                onClick={handleSaveMedia}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
              >
                Save Media
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 justify-between items-center mb-4">
        <h2 className="font-bold text-2xl">Services</h2>
        <button
          className="flex items-center gap-2 border rounded-full py-2 px-6 bg-gray-800 text-white"
          onClick={() => setShowNewServiceForm(true)}
        >
          <MdAdd />
          New
        </button>
      </div>

      {showNewServiceForm && (
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newServiceName}
            onChange={(e) => setNewServiceName(e.target.value)}
            placeholder="Service Name"
            className="border p-2 rounded w-full"
          />
          <button
            onClick={handleAddNewService}
            className="px-4 py-2 bg-green-700 text-white rounded"
          >
            Add
          </button>
        </div>
      )}

      {services.map((service) => (
        <div key={service.name} className="flex justify-between items-center w-96 border p-4 bg-gray-200">
          <Trash2
            className="cursor-pointer mr-2 text-gray-300 hover:text-red-600"
            onClick={() => handleRemoveService(service.name)}
          />
          <button
            onClick={() => handleButtonClick(service)}
            className="flex-grow text-left"
          >
            {service.name}
          </button>
          <ChevronRight />
        </div>
      ))}

      {showDeletePopup && (
        <DeletePopUp
          message={`Are you sure you want to delete the "${serviceToDelete}" service?`}
          onConfirm={confirmDeleteService}
          onCancel={cancelDeleteService}
        />
      )}
    </div>
  );
};

export default Services;
