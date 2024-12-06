import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const ChangePassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || ""; // Retrieve email from the previous component
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError(null); 
    setSuccess(null); 
    // // Log the data that will be sent to the backend
    // console.log("Data being sent to backend:", { email, password });

    try {
      // Send a request to the backend to change the password
      const response = await fetch("http://localhost:5000/api/admin/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Parse the response
      const responseData = await response.json();

      // Check if the response was successful
      if (!response.ok) {
        throw new Error(responseData.message || "Password change failed");
      }

      // Show success message and navigate to success page
      setSuccess("Password changed successfully!");
      setTimeout(() => navigate("/PasswordResetSuccess"), 1500); 

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {/* Title */}
      <h2 className="font-bold text-2xl mb-4">Change Your Password</h2>
      {/* Subtext */}
      <p className="mb-6">Enter a new password for your account</p>

      <form
        onSubmit={handleChangePassword}
        className="flex flex-col items-center justify-center rounded-lg border border-gray-300 shadow-lg w-[550px] h-[300px]"
      >
        {/* Password Input Field */}
        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
            placeholder="Enter new password"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-2.5 text-gray-600 focus:outline-none"
          >
            {showPassword ? (
              <AiFillEyeInvisible className="h-5 w-5" />
            ) : (
              <AiFillEye className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Error and Success Messages */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        {/* Change Password Button */}
        <button
          type="submit"
          className="w-96 bg-black text-white py-2 px-6 rounded-full hover:bg-[#C5A592] transition duration-200"
        >
          CHANGE PASSWORD
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;




// import { useState } from "react";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import the icons from react-icons
// import { Link } from "react-router-dom";

// const ChangePassword = () => {
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   // Toggle password visibility
//   const togglePasswordVisibility = () => {
//     setShowPassword((prevShowPassword) => !prevShowPassword);
//   };

//   const handleChangePassword = (e) => {
//     e.preventDefault();
//     // Logic for changing password (e.g., API call)
//     console.log("New Password:", password);
//   };

//   return (
//     <div className="flex flex-col justify-center items-center h-screen">
//       {/* Title */}
//       <h2 className="font-bold text-2xl mb-4">Change Your Password</h2>
//       {/* Subtext */}
//       <p className="mb-6">Enter a new password for your account</p>

//       <form 
//         onSubmit={handleChangePassword} 
//         className="flex flex-col items-center justify-center rounded-lg border border-gray-300 shadow-lg w-[550px] h-[250px]">
//         {/* Password Input Field */}
//         <div className="relative mb-6">
//           <input
//             type={showPassword ? "text" : "password"} // Toggle input type between 'text' and 'password'
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
//             placeholder="Enter new password"
//             required
//           />
//           {/* Eye Icon for Toggling Password Visibility */}
//           <button
//             type="button"
//             onClick={togglePasswordVisibility}
//             className="absolute right-3 top-2.5 text-gray-600 focus:outline-none"
//           >
//             {showPassword ? (
//               <AiFillEyeInvisible className="h-5 w-5" /> // Eye slash icon
//             ) : (
//               <AiFillEye className="h-5 w-5" /> // Eye icon
//             )}
//           </button>
//         </div>

//         {/* Change Password Button */}

//         <Link to='/PasswordResetSuccess'>
//         <button
//           type="submit"
//           className="w-96 bg-black text-white py-2 px-6 rounded-full hover:bg-[#C5A592] transition duration-200"
//         >
//           CHANGE PASSWORD
//         </button>
//         </Link>
//       </form>
//     </div>
//   );
// };

// export default ChangePassword;
