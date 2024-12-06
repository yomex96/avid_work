import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";





const Login = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

 


  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
  
    // Determine if the input is email or phone number
    let loginData = {};
    if (emailOrPhone.includes('@')) {
      loginData = { email: emailOrPhone, password };  
    } else {
      loginData = { phoneNumber: emailOrPhone, password };  
    }
  
    // console.log("Data sent to the backend:", loginData);
  
    try {
      const response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // console.log("Login successful:", data);
        handleGoToDashboard(); 
      } else {
        setError(data.error || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToDashboard = () => {
    navigate("/admin/profile"); 
  };


  return (
    <div className="flex flex-col justify-center items-center w-[666px] h-[440px] mx-auto">
      <div className="flex flex-col text-center justify-center items-center">
        <h2 className="font-bold text-3xl">Welcome Back!</h2>
        <p>Login to your dashboard</p>
      </div>
      <div className="w-full mx-auto p-6 pb-10 bg-white shadow-2xl border border-black mt-8 rounded-lg">
        <form onSubmit={handleLogin} className="h-56 flex flex-col gap-4">
          <div className="flex flex-col gap-4 mb-6">
            <label
              htmlFor="emailOrPhone"
              className="absolute top-[160px] px-1 bg-white ml-2 block text-gray-700 mb-2"
            >
              Phone Number or Email
            </label>
            <input
              type="text"
              id="emailOrPhone"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black bg-white"
              placeholder="Enter your email or phone number"
              required
            />
          </div>

          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="absolute bottom-6 px-1 bg-white ml-2 block text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black focus:bg-white"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-5 transform -translate-y-1/2 text-gray-500 focus:outline-none"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-full hover:bg-[#C5A592] transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </form>
      </div>
      <div className="flex justify-end w-full">
        {/* <p>
          Don&apos;t Have an Account?{" "}
          <Link to="/SignUp">
            <span className="font-bold text-lg hover:underline">Sign Up</span>
          </Link>
        </p> */}
        <p className="text-right">
          Forgot Password?{" "}
          <Link to="/Reset">
            <span className="font-bold text-lg hover:underline">RESET</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;








// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Eye, EyeOff } from "lucide-react";

// const Login = () => {
//   const [emailOrPhone, setEmailOrPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     try {
//       const response = await fetch("http://localhost:5000/api/admin/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ emailOrPhone, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         console.log("Login successful:", data);
//         // Handle successful login, e.g., save token and redirect
//       } else {
//         setError(data.message || "Login failed. Please try again.");
//       }
//     } catch (err) {
//       console.error("Error during login:", err);
//       setError("An error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col justify-center items-center w-[666px] h-[440px] mx-auto">
//       <div className="flex flex-col text-center justify-center items-center">
//         <h2 className="font-bold text-3xl">Welcome Back!</h2>
//         <p>Login to your dashboard</p>
//       </div>
//       <div className="w-full mx-auto p-6 bg-white shadow-2xl border border-black mt-8 rounded-lg">
//         <form onSubmit={handleLogin} className="h-56 flex flex-col gap-4">
//           <div className="flex flex-col gap-4 mb-6">
//             <label
//               htmlFor="emailOrPhone"
//               className="absolute top-[172px] px-1 bg-white ml-2 block text-gray-700 mb-2"
//             >
//               Phone Number or Email
//             </label>
//             <input
//               type="text"
//               id="emailOrPhone"
//               value={emailOrPhone}
//               onChange={(e) => setEmailOrPhone(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black bg-white"
//               placeholder="Enter your email or phone number"
//               required
//             />
//           </div>

//           <div className="mb-6 relative">
//             <label
//               htmlFor="password"
//               className="absolute bottom-6 px-1 bg-white ml-2 block text-gray-700 mb-2"
//             >
//               Password
//             </label>
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black focus:bg-white"
//               placeholder="Enter your password"
//               required
//             />
//             <button
//               type="button"
//               onClick={togglePasswordVisibility}
//               className="absolute right-3 top-5 transform -translate-y-1/2 text-gray-500 focus:outline-none"
//             >
//               {showPassword ? <EyeOff /> : <Eye />}
//             </button>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-black text-white py-2 px-4 rounded-full hover:bg-[#C5A592] transition duration-200"
//             disabled={isLoading}
//           >
//             {isLoading ? "Logging in..." : "Login"}
//           </button>
//           {error && <p className="text-red-500 text-center mt-2">{error}</p>}
//         </form>
//       </div>
//       <div className="flex justify-between gap-52">
//         <p>
//           Don&apos;t Have an Account?{" "}
//           <Link to="/SignUp">
//             <span className="font-bold text-lg hover:underline">Sign Up</span>
//           </Link>
//         </p>
//         <p>
//           Forgot Password?{" "}
//           <Link to="/Reset">
//             <span className="font-bold text-lg hover:underline">RESET</span>
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Eye, EyeOff } from "lucide-react"; // Import the Eye and EyeOff icons

// const Login = () => {
//   const [emailOrPhone, setEmailOrPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // LOGIN LOGIC HERE

//     console.log("Email/Phone:", emailOrPhone, "Password:", password);
//   };

//   return (
//     <div className="flex flex-col justify-center items-center w-[666px] h-[440px] mx-auto">
//       <div className="flex flex-col text-center justify-center items-center">
//         <h2 className="font-bold text-3xl">Welcome Back!</h2>
//         <p>Login to your dashboard</p>
//       </div>
//       <div className="w-full mx-auto p-6 bg-white shadow-2xl border border-black mt-8 rounded-lg">
//         <form onSubmit={handleLogin} className="h-56 flex flex-col gap-4">
//           <div className="flex flex-col gap-4 mb-6">
//             <label
//               htmlFor="emailOrPhone"
//               className="absolute top-[172px] px-1 bg-white ml-2 block text-gray-700 mb-2"
//             >
//               Phone Number or Email
//             </label>
//             <input
//               type="text"
//               id="emailOrPhone"
//               value={emailOrPhone}
//               onChange={(e) => setEmailOrPhone(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black bg-white"
//               placeholder="Enter your email or phone number"
//               required
//             />
//           </div>

//           <div className="mb-6 relative">
//             <label
//               htmlFor="password"
//               className="absolute bottom-6 px-1 bg-white ml-2 block text-gray-700 mb-2"
//             >
//               Password
//             </label>
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black focus:bg-white"
//               placeholder="Enter your password"
//               required
//             />
//             <button
//               type="button"
//               onClick={togglePasswordVisibility}
//               className="absolute right-3 top-5 transform -translate-y-1/2 text-gray-500 focus:outline-none"
//             >
//               {showPassword ? <EyeOff /> : <Eye />} {/* Use Eye and EyeOff icons */}
//             </button>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-black text-white py-2 px-4 rounded-full hover:bg-[#C5A592] transition duration-200"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//       <div className="flex justify-between gap-52">
//         <p>
//           Don&apos;t Have an Account?{"  "}
//           <Link to="/SignUp">
//             <span className="font-bold text-lg hover:underline">Sign Up</span>
//           </Link>
//         </p>
//         <p>
//           Forgot Password?{"  "}
//           <Link to="/Reset">
//             <span className="font-bold text-lg hover:underline">RESET</span>
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
