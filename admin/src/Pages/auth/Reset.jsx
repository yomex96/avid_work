import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null); // to handle errors
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if the email format is valid
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    console.log("Data being sent:", { email });

    try {
      // Send the email to the backend API
      const response = await fetch("http://localhost:5000/api/admin/send-reset-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send reset code.");
      }

      // Pass the email to the Verify page if successful
      navigate("/verify", { state: { email } });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-[666px] h-[440px] mx-auto">
      <div className="flex flex-col text-center justify-center items-center">
        <h2 className="font-bold text-3xl">Find Your Account</h2>
        <p>Enter your email to reset your password</p>
      </div>
      <div className="w-full mx-auto p-6 bg-white shadow-2xl border border-black mt-8 rounded-lg">
        <form onSubmit={handleLogin} className="h-36 flex flex-col mt-6">
          <div className="flex flex-col gap-4 mb-6">
            <label
              htmlFor="email"
              className="absolute top-[235px] px-1 bg-white ml-2 block text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black bg-white"
              placeholder="Enter your email address"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-full hover:bg-[#C5A592] transition duration-200"
          >
            NEXT
          </button>
          
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Reset;



// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; 
// const Reset = () => {
//   const [emailOrPhone, setEmailOrPhone] = useState("");
//   const navigate = useNavigate(); 

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Pass the email/phone to the Verify page
//     navigate("/verify", { state: { emailOrPhone } });
//   };

//   return (
//     <div className="flex flex-col justify-center items-center w-[666px] h-[440px] mx-auto">
//       <div className="flex flex-col text-center justify-center items-center">
//         <h2 className="font-bold text-3xl">Find Your Account</h2>
//         <p>Find account to reset password</p>
//       </div>
//       <div className="w-full mx-auto p-6 bg-white shadow-2xl border border-black mt-8 rounded-lg">
//         <form onSubmit={handleLogin} className="h-36 flex flex-col mt-6">
//           <div className="flex flex-col gap-4 mb-6">
//             <label
//               htmlFor="emailOrPhone"
//               className="absolute top-[235px] px-1 bg-white ml-2 block text-gray-700 mb-2"
//             >
//               Email
//             </label>
//             <input
//               type="text"
//               id="emailOrPhone"
//               value={emailOrPhone}
//               onChange={(e) => setEmailOrPhone(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black bg-white"
//               placeholder="Enter your email address"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-black text-white py-2 px-4 rounded-full hover:bg-[#C5A592] transition duration-200"
//           >
//             NEXT
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Reset;
