import TrashAnimation from "./TrashAnimation";
import { toast } from "react-hot-toast";

const DeletePopUp = ({ message, onConfirm, onCancel }) => {
  const handleConfirm = () => {
    // Show success notification
    toast.success("Deleted successfully!");

    // Call the onConfirm function passed as a prop
    onConfirm();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg ml-60 p-6 w-1/3">
        <p className="text-lg mb-4">{message}</p>
        <TrashAnimation />
        
        <div className="flex justify-between">
          <button
            className="bg-black hover:bg-red-600 text-white px-24 py-2 rounded-full"
            onClick={onCancel}
          >
            Cancel
          </button>
          
          <button
            className="border border-black hover:bg-green-600 hover:border-none hover:text-white text-black px-14 py-2 rounded-full mr-2"
            onClick={handleConfirm} // Use handleConfirm instead of onConfirm directly
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopUp;
