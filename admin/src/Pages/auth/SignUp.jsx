import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); // For handling error messages
  const [message, setMessage] = useState(""); // For success message
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate(); // Hook to handle navigation

  // const handleSignUp = async (e) => {
  //   e.preventDefault();
    
  //   // Reset error and message state before making the request
  //   setError("");
  //   setMessage("");
  //   console.log("Email for Admin Profile:", email);
    
  //   // Check if email is valid
  //   if (!email) {
  //     setError("Please enter a valid email.");
  //     return;
  //   }

  //   setLoading(true); // Start loading
    
  //   try {
  //     // Sending POST request to validate the email
  //     const response = await fetch("http://localhost:5000/api/admin/validate", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       // If email validation is successful (HTTP status 200)
  //       setMessage(data.message || "Email validated successfully!");
  //       console.log("Email validated successfully:", email);

  //       // Redirect to the next page if validation is successful
  //       navigate("/CreateAccount"); // Redirect to the next page (replace with your desired route)
  //     } else {
  //       // Handle error from response
  //       setError(data.error || "Email validation failed.");
  //     }
  //   } catch (err) {
  //     // Handle network errors
  //     setError("An error occurred while validating email.");
  //     console.error("Error validating email:", err);
  //   } finally {
  //     setLoading(false); // End loading
  //   }
  // };

  const handleSignUp = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/admin/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Email validated successfully!");

        // Save validated email to localStorage
        localStorage.setItem("validatedEmail", email);
        navigate("/CreateAccount");
      } else {
        setError(data.error || "Email validation failed.");
      }
    } catch (err) {
      setError("An error occurred while validating email.");
      console.error("Error validating email:", err);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-2 relative">
      <h2 className="font-bold text-4xl">Create Account</h2>

      <p className="mb-6">Enter your email to create your admin profile</p>

      {/* Display error message if any */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Display success message if available */}
      {message && !error && <p className="text-green-500">{message}</p>}

      {/* Form for entering email */}
      <form
        onSubmit={handleSignUp}
        className="flex flex-col items-center justify-center rounded-lg border border-gray-300 shadow-lg w-[550px] h-[156px]"
      >
        <div className="relative">
          <label
            htmlFor="email"
            className="absolute left-1 bottom-14 bg-white px-1"
          >
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[500px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
            placeholder="Enter your email"
            required
          />

          <small className="text-gray-500 block ml-4 mt-2">
            This Email will be verified before you can proceed.
          </small>
        </div>
      </form>

      {/* Display loading text while request is in progress */}
      {loading && <p className="text-gray-500">Verifying email...</p>}

      {/* Next button */}
      <button
        type="submit"
        onClick={handleSignUp}
        className="w-[550px] bg-black mt-4 text-white py-2 px-6 rounded-full hover:bg-[#C5A592] transition duration-200"
      >
        NEXT
      </button>

      {/* Link to login page */}
      <div className="absolute bottom-12 text-center">
        <p>
          Already have an account?{" "}
          <Link to="/Login">
            <span className="font-bold text-xl hover:underline">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;


