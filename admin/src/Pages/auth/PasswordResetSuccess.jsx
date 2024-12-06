import { AiOutlineCheckCircle } from "react-icons/ai"; // Import success icon
import { useNavigate } from "react-router-dom"; // For navigation

const PasswordResetSuccess = () => {
  const navigate = useNavigate();

  // Redirect to login
  const handleReturnToLogin = () => {
    navigate("/login"); // Make sure the /login route exists
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {/* Success Icon */}
      <AiOutlineCheckCircle className="text-green-500" size={80} />

      {/* Success Message */}
      <h2 className="font-bold text-xl mt-4 mb-6">
        Your Password Has Been Changed Successfully!
      </h2>

      {/* Return to Login Button */}
      <button
        onClick={handleReturnToLogin}
        className="bg-black text-white py-2 px-6 rounded-full hover:bg-[#C5A592] transition duration-200"
      >
        Return to Login
      </button>
    </div>
  );
};

export default PasswordResetSuccess;
