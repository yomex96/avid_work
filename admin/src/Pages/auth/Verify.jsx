import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || ""; 

  const [code, setCode] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

 
  const handleChange = (e, index) => {
    const newCode = [...code];
    newCode[index] = e.target.value.slice(0, 1); 
    setCode(newCode);

    // Move focus to the next input if the current one is filled
    if (e.target.value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace to move focus to the previous input
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Countdown timer logic
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown); 
    }
  }, [timer]);

  // Resend code logic
  const handleResendCode = async () => {
    setTimer(60); 
    setError(null);
    setSuccess(null);

    // console.log("Data being sent to resend endpoint:", { email }); 

    try {
      const response = await fetch("http://localhost:5000/api/admin/send-reset-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), 
      });

      if (!response.ok) {
        throw new Error("Failed to resend reset code.");
      }

      setSuccess("Reset code has been resent to your email.");
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join(""); 

    // Validate that all digits are entered
    if (verificationCode.length < 6) {
      setError("Please enter the complete 6-digit code.");
      return;
    }

    // console.log("Data being sent to verify endpoint:", { email, code: verificationCode }); 

    try {
      const response = await fetch("http://localhost:5000/api/admin/verify-reset-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code: verificationCode }), 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Verification failed. Please try again.");
      }

      // If verification succeeds, navigate to ChangePassword
      navigate("/ChangePassword", { state: { email } });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h2 className="font-bold text-2xl mb-4">Verify Your Account</h2>
      <p className="mb-6">
        We&apos;ve sent a 6-digit code to <strong>{email}</strong>
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center rounded-lg border border-gray-300 shadow-lg p-8 bg-white w-[550px]"
      >
        <div className="flex space-x-4 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:border-black text-lg"
              maxLength={1}
              ref={(el) => (inputRefs.current[index] = el)} // Assign ref to each input
              required
            />
          ))}
        </div>

        <p className="mb-4">
          Send Again{" "}
          {timer > 0 ? (
            <span className="text-gray-500">in {timer} seconds</span>
          ) : (
            <span
              className="text-blue-600 cursor-pointer"
              onClick={handleResendCode}
            >
              Send Now
            </span>
          )}
        </p>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <button
          type="submit"
          className="bg-black text-white py-2 px-6 rounded-full hover:bg-[#C5A592] transition duration-200"
        >
          NEXT
        </button>
      </form>
    </div>
  );
};

export default Verify;




// import { useState, useEffect, useRef } from "react";
// import { Link, useLocation } from "react-router-dom"; // Assuming you're using react-router for navigation

// const Verify = () => {
//   // Getting the email from the state passed in Reset component
//   const location = useLocation();
//   const email = location.state?.emailOrPhone || ""; // This gets the email from Reset

//   const [code, setCode] = useState(Array(6).fill(""));
//   const inputRefs = useRef([]); // To store refs for input fields
//   const [timer, setTimer] = useState(60);

//   // Handle code input change and auto-focus next field
//   const handleChange = (e, index) => {
//     const newCode = [...code];
//     newCode[index] = e.target.value.slice(0, 1); // Limit input to one character
//     setCode(newCode);

//     // Move focus to the next input if the current one is filled
//     if (e.target.value && index < 5) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   // Countdown timer logic
//   useEffect(() => {
//     if (timer > 0) {
//       const countdown = setInterval(() => {
//         setTimer((prevTimer) => prevTimer - 1);
//       }, 1000);
//       return () => clearInterval(countdown); // Clear timer on unmount
//     }
//   }, [timer]);

//   // Resend code logic
//   const handleResendCode = () => {
//     setTimer(60); // Reset the timer to 60 seconds
//     console.log("Resend code logic here");
//     // Trigger your resend code logic here (e.g., API call to send another code)
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Verification logic here
//     console.log("Entered code:", code.join(""));
//   };

//   return (
//     <div className="flex flex-col justify-center items-center h-screen">
//       <h2 className="font-bold text-2xl mb-4">Verify Your Account</h2>
//       <p className="mb-6">
//         We&apos;ve sent a 6-digit code to <strong>{email}</strong>
//       </p>

//       <form
//         onSubmit={handleSubmit}
//         className="flex flex-col items-center justify-center rounded-lg border border-gray-300 shadow-lg w-[550px] h-[250px]"
//       >
//         <div className="flex space-x-8 mb-6">
//           {code.map((digit, index) => (
//             <input
//               key={index}
//               type="text"
//               value={digit}
//               onChange={(e) => handleChange(e, index)}
//               className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:border-black"
//               maxLength={1}
//               ref={(el) => (inputRefs.current[index] = el)} // Assign ref to each input
//               required
//             />
//           ))}
//         </div>

//         <p className="mb-4">
//           Send Again{" "}
//           {timer > 0 ? (
//             `in ${timer} seconds`
//           ) : (
//             <span
//               className="text-blue-600 cursor-pointer"
//               onClick={handleResendCode}
//             >
//               Send Now
//             </span>
//           )}
//         </p>

//         <Link to='/ChangePassword'>
//           <button
//             type="submit"
//             className="bg-black text-white py-2 px-6 rounded-full hover:bg-[#C5A592] transition duration-200"
//           >
//             NEXT
//           </button>
//         </Link>
//       </form>
//     </div>
//   );
// };

// export default Verify;
