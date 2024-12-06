// import { useState } from "react";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
// import { Link, useNavigate } from "react-router-dom";
// import { BsCheckCircle } from "react-icons/bs";

// const CreateAccount = ({ validatedEmail }) => {
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isProfileCreated, setIsProfileCreated] = useState(false); // profile creation popup
//   const [error, setError] = useState(""); // Error message state
//   const [loading, setLoading] = useState(false); // Loading state
//   const navigate = useNavigate();

//   // Toggle password visibility for both password fields
//   const togglePasswordVisibility = () => {
//     setShowPassword((prevShowPassword) => !prevShowPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
//   };

//   // const handleCreateAccount = async (e) => {
//   //   e.preventDefault();
//   //   setError("");

//   //   // Check if password and confirmPassword match
//   //   if (password !== confirmPassword) {
//   //     setError("Passwords do not match.");
//   //     return;
//   //   }

//   //   setLoading(true);

//   //   try {
//   //     // Send POST request to create the account
//   //     const response = await fetch("http://localhost:5000/api/admin/register", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({
//   //         email: validatedEmail,
//   //         phoneNumber,
//   //         password,
//   //       }),
//   //     });

//   //     const data = await response.json();

//   //     if (response.ok) {
//   //       setIsProfileCreated(true); // Show success popup
//   //     } else {
//   //       setError(data.error || "Account creation failed.");
//   //     }
//   //   } catch (err) {
//   //     setError("An error occurred while creating the account.");
//   //     console.error("Error creating account:", err);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };


  
//     // Retrieve the validated email from localStorage
//     const email = localStorage.getItem("validatedEmail");
  
//     const handleCreateAccount = async (e) => {
//       e.preventDefault();
  
//       const dataToSend = {
//         email, // Use the email from localStorage
//         phoneNumber,
//         password,
//         confirmPassword,
//       };
  
//       console.log("Data being sent to the backend:", dataToSend);
  
//       try {
//         const response = await fetch("http://localhost:5000/api/admin/register", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(dataToSend),
//         });
  
//         const result = await response.json();
//         console.log("Response from backend:", result);
  
//         if (response.ok) {
//           setIsProfileCreated(true);
//           // Clear email from localStorage after account creation
//           localStorage.removeItem("validatedEmail");
//         }
//       } catch (error) {
//         console.error("Error sending data to backend:", error);
//       }
//     };

//   // const handleCreateAccount = async (e) => {
//   //   e.preventDefault();

//   //   const dataToSend = {
//   //     phoneNumber,
//   //     password,
//   //     confirmPassword,
//   //   };

//   //   // Log the data to see it in the console
//   //   console.log("Data being sent to the backend:", dataToSend);

//   //   try {
//   //     // Simulate the API call
//   //     const response = await fetch("http://localhost:5000/api/admin/register", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify(dataToSend),
//   //     });

//   //     const result = await response.json();
//   //     console.log("Response from backend:", result);

//   //     // If successful, show profile created popup
//   //     if (response.ok) {
//   //       setIsProfileCreated(true);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error sending data to backend:", error);
//   //   }
//   // };

//   const handleGoToDashboard = () => {
//     navigate("/");
//   };

import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";
import { toast } from "react-hot-toast"; // Import toast

const CreateAccount = ({ validatedEmail }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isProfileCreated, setIsProfileCreated] = useState(false); // profile creation popup
  const [error, setError] = useState(""); // Error message state
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  // Toggle password visibility for both password fields
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowConfirmPassword) => !prevShowConfirmPassword);
  };

  const email = localStorage.getItem("validatedEmail");

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    const dataToSend = {
      email, // Use the email from localStorage
      phoneNumber,
      password,
      confirmPassword,
    };

    console.log("Data being sent to the backend:", dataToSend);

    try {
      const response = await fetch("http://localhost:5000/api/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();
      console.log("Response from backend:", result);

      if (response.ok) {
        setIsProfileCreated(true);
        toast.success("Profile created successfully!"); // Show success toast
        // Clear email from localStorage after account creation
        localStorage.removeItem("validatedEmail");
      } else {
        setError(result.error || "Account creation failed.");
        toast.error(result.error || "Account creation failed."); // Show error toast
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
      toast.error("An error occurred. Please try again later."); // Show error toast
    }
  };

  const handleGoToDashboard = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center h-screen relative">
      <h2 className="font-bold text-4xl mb-4">Create Account</h2>
      <p className="mb-6">
        Enter your phone number and password to further secure your account
      </p>

      {error && <p className="text-red-500">{error}</p>}

      <form
        onSubmit={handleCreateAccount}
        className="border border-gray-300 shadow-lg p-8 rounded-lg flex flex-col items-center justify-center space-y-6"
      >
        <div className="mb-6">
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-[500px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div className="flex space-x-4">
          <div className="relative w-[245px]">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
              placeholder="Enter password"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-2.5 text-gray-600 focus:outline-none"
            >
              {showPassword ? <AiFillEyeInvisible className="h-5 w-5" /> : <AiFillEye className="h-5 w-5" />}
            </button>
          </div>

          <div className="relative w-[245px]">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
              placeholder="Confirm password"
              required
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-2.5 text-gray-600 focus:outline-none"
            >
              {showConfirmPassword ? <AiFillEyeInvisible className="h-5 w-5" /> : <AiFillEye className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </form>

      <button
        type="submit"
        className="w-[550px] bg-black text-white mt-4 py-2 px-6 rounded-full hover:bg-[#C5A592] transition duration-200"
        onClick={handleCreateAccount}
        disabled={loading}
      >
        {loading ? "Creating Profile..." : "Create Profile"}
      </button>

      <div className="absolute bottom-12 text-center">
        <p>
          Already have an account?{" "}
          <Link to="/Login">
            <span className="font-bold text-xl hover:underline">Login</span>
          </Link>
        </p>
      </div>

      {isProfileCreated && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-3xl font-bold mb-4">Profile Created Successfully</h2>
            <BsCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
            <button
              className="bg-black w-96 text-white py-2 px-6 rounded-full hover:bg-green-600 transition duration-200"
              onClick={handleGoToDashboard}
            >
              Go To Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateAccount;


