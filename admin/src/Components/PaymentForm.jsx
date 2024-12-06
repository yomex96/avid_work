// import { useState, useEffect } from "react";
import { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { LiaEdit } from "react-icons/lia"; // Assuming you are using react-icons
import StoreContext from "../context/StoreContext";



export default function PaymentForm() {
  const { bankInfo, addBankInfo } = useContext(StoreContext);
  const [isEditing, setIsEditing] = useState(false); // State to track if in edit mode
  const [formData, setFormData] = useState({
    accountName: "",
    accountNumber: "",
    bankName: "",
    bankSwiftCode: "",
  });

  // Load saved data from localStorage when the component mounts
  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem("paymentFormData"));
    if (savedFormData) {
      setFormData(savedFormData); // Set form data with saved values from localStorage
    }
  }, []);

   // Load saved data from context when the component mounts
   useEffect(() => {
    if (bankInfo) {
      setFormData(bankInfo); // Set form data with values from context
    }
  }, [bankInfo]);

  const handleEditClick = () => {
    setIsEditing(!isEditing); // Toggle edit mode
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value, // Update form data as user types
    });
  };

  const handleSaveClick = async () => {
    try {
      await addBankInfo(formData); // Call the function to save the new bank info
      localStorage.setItem("paymentFormData", JSON.stringify(formData));
      setIsEditing(false); // Exit edit mode after saving
      toast.success("Payment Information Updated");
    } catch (error) {
      console.error("Error saving payment information:", error);
      toast.error("Failed to update payment information.");
    }
  };




  return (
    <div className="mt-4">
      <div className="bg-[#E4D5CD] h-24 w-full">
        <h2 className="flex items-center p-2 text-2xl font-bold h-16 ">
          Payment Information
        </h2>
        <p className="pl-2 ">
          Please provide accurate details for your payment information
        </p>
      </div>
      <div className="flex pb-4">
        <p className="font-bold pt-2">Bank Account Details</p>
      </div>
      <form className="p-4 bg-white rounded shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label
              htmlFor="accountName"
              className="bottom-[24px] bg-white px-1 ml-1 block mb-2 text-sm font-medium text-gray-700"
            >
              Account Name
            </label>
            <input
              type="text"
              id="accountName"
              className="block w-full p-2 border border-gray-300 rounded"
              placeholder="Enter Account Name"
              value={formData.accountName}
              onChange={handleInputChange}
              disabled={!isEditing} // Disable input when not editing
            />
          </div>
          <div>
            <label
              htmlFor="accountNumber"
              className="bottom-[-332px] bg-white px-1 ml-1 block mb-2 text-sm font-medium text-gray-700"
            >
              Account Number
            </label>
            <input
              type="text"
              id="accountNumber"
              className="block w-full p-2 border border-gray-300 rounded"
              placeholder="Enter Account Number"
              value={formData.accountNumber}
              onChange={handleInputChange}
              disabled={!isEditing} // Disable input when not editing
            />
          </div>
          <div>
            <label
              htmlFor="bankName"
              className="bottom-[-390px] bg-white px-1 ml-1 block mb-2 text-sm font-medium text-gray-700"
            >
              Bank Name
            </label>
            <input
              type="text"
              id="bankName"
              className="block w-full p-2 border border-gray-300 rounded"
              placeholder="Enter Bank Name"
              value={formData.bankName}
              onChange={handleInputChange}
              disabled={!isEditing} // Disable input when not editing
            />
          </div>
          <div>
            <label
              htmlFor="bankSwiftCode"
              className="bottom-[-390px] bg-white px-1 ml-1 block mb-2 text-sm font-medium text-gray-700"
            >
              Bank Swift Code
            </label>
            <input
              type="text"
              id="bankSwiftCode"
              className="block w-full p-2 border border-gray-300 rounded"
              placeholder="Enter Bank Swift Code"
              value={formData.bankSwiftCode}
              onChange={handleInputChange}
              disabled={!isEditing} // Disable input when not editing
            />
          </div>
        </div>

        <div className="flex justify-end">
          {isEditing ? (
            <button
              type="button"
              onClick={handleSaveClick}
              className="w-24 mt-6 text-white bg-green-900 px-4 py-3 rounded-full"
            >
              Save
            </button>
          ) : (
            <button
              type="button"
              onClick={handleEditClick}
              className="flex gap-2 items-center w-24 mt-6 text-black border border-black bg-white px-4 py-3 rounded-full"
            >
              Edit
              <LiaEdit className="size-6" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
