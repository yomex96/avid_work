import { useContext, useEffect, useState } from "react";
import {
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPinIcon,
  PhoneCall,
  X,
} from "lucide-react";
import { StoreContext } from "../context/StoreContext";
import toast from "react-hot-toast";
import { FaInstagram } from "react-icons/fa";
import AnimatedUnderline from "./AnimatedUnderline";

const ContactUs = () => {
  const { sendContactMessage } = useContext(StoreContext);

  // State for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  // State for company info
  const [companyInfo, setCompanyInfo] = useState({
    phone: "",
    email: "",
    address: "",
    social: {
      facebook: "",
      instagram: "",
      linkedin: "",
    },
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendContactMessage(formData);
      toast.success("Message sent successfully!");
      console.log("Message sent successfully:", response);
      // Reset form after submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("There was an error sending the message. Please try again.");
    }
  };

  // Fetch company info
  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        // Determine the URL based on the environment
        const url =
          window.location.hostname === "localhost"
            ? "http://localhost:5000/api/company-info"
            : "/api/company-info"; // Use relative URL in production

        const response = await fetch(url);
        const data = await response.json();
        setCompanyInfo(data);
      } catch (error) {
        console.error("Error fetching company info:", error);
      }
    };
    fetchCompanyInfo();
  }, []);

  const linkedinUsername = companyInfo.social.linkedin;

  return (
    <div className="w-full overflow-x-hidden">
      {/* CONTACT US HEADER */}
      <div className="flex flex-col items-center bg-white px-4 pt-20 py-6">
<AnimatedUnderline>
<h2 className="font-bold text-3xl">Contact Us</h2>
</AnimatedUnderline>
        <p className="text-center mt-4 max-w-lg">
          We’d love to hear from you! Get in touch, and let’s start planning how
          to bring your vision to life through our lens.
        </p>
      </div>

      {/* CONTACT INFO AND FORM SECTION */}
      <div className="flex flex-col md:flex-row py-10 px-4 md:px-[120px] bg-black">
        {/* LEFT DIV - CONTACT INFORMATION */}
        <div className="flex flex-col justify-between bg-white w-full md:w-1/3 h-auto md:h-[456.58px] py-12 px-6 mb-8 md:mb-0">
          <div className="text-center">
            <h2 className="font-bold text-2xl">Contact Information</h2>
            <p className="mb-6">Tell us what's on your mind</p>
            <div className="flex flex-col gap-4">
              <div className="flex gap-5 items-center">
                <PhoneCall className="h-6 w-6 flex-shrink-0" />
                <h5 className="font-normal text-left">
                  {companyInfo.phone || "Phone not available"}
                </h5>
              </div>
              <div className="flex gap-5 items-center">
                <Mail className="h-6 w-6 flex-shrink-0" />
                <h5 className="font-normal text-left">
                  {companyInfo.email || "Email not available"}
                </h5>
              </div>
              <div className="flex gap-5 items-center">
                <MapPinIcon className="h-6 w-6 flex-shrink-0" />
                
                  <h5 className="font-normal text-left">
                  {companyInfo.address || "Address not available"}
                </h5>
              </div>
            </div>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 justify-center mt-8">
            {companyInfo.social.facebook && (
              <a
                href={companyInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="bg-avidBrown p-2 rounded-full">
                  <Facebook className="text-white" />
                </p>
              </a>
            )}
            {/* {companyInfo.social.instagram && (
              <a href={companyInfo.social.instagram} target="_blank" rel="noopener noreferrer">
                <p className="bg-avidBrown p-2 rounded-full">
                  <Instagram className="text-white" />
                </p>
              </a>
            )} */}
            {companyInfo.social.instagram && (
              <a
                href={`https://www.instagram.com/${companyInfo.social.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="bg-avidBrown p-2 rounded-full">
                  <Instagram className="text-white" />
                </p>
                {/* <FaInstagram size={30} /> */}
              </a>
            )}

            {/* {companyInfo.social.linkedin && (
              <a href={companyInfo.social.linkedin} target="_blank" rel="noopener noreferrer">
                <p className="bg-avidBrown p-2 rounded-full">
                  <Linkedin className="text-white" />
                </p>
              </a> */}

            {linkedinUsername && (
              <a
                href={`https://www.linkedin.com/in/${linkedinUsername}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="bg-avidBrown p-2 rounded-full">
                  <Linkedin className="text-white" />
                </p>
              </a>
            )}
          </div>
        </div>

        {/* RIGHT DIV - CONTACT FORM */}
        <form
          className="flex flex-col text-white w-full md:w-2/3 border border-white md:m-3 p-4 space-y-4 md:space-y-0"
          onSubmit={handleSubmit}
        >
          {/* USER DETAILS */}
          <div className="grid grid-cols-1 mb-4 md:grid-cols-2 gap-4">
            {/* FIRST NAME */}
            <div className="w-full">
              <label
                htmlFor="firstName"
                className="text-sm pl-1 font-medium block"
              >
                First Name
              </label>
              <input
                type="text"
                placeholder="Your first name"
                id="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full pl-1 h-[56px] rounded-2xl bg-transparent border-b border-white mb-4 md:mb-0"
              />
            </div>

            {/* LAST NAME */}
            <div className="w-full">
              <label
                htmlFor="lastName"
                className="text-sm pl-1 font-medium block"
              >
                Last Name
              </label>
              <input
                type="text"
                placeholder="Your last name"
                id="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full pl-1 h-[56px] rounded-2xl bg-transparent border-b border-white mb-4 md:mb-0"
              />
            </div>

            {/* EMAIL */}
            <div className="w-full">
              <label htmlFor="email" className="text-sm pl-1 font-medium block">
                Email
              </label>
              <input
                type="email"
                placeholder="youremail@gmail.com"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-1 h-[56px] rounded-2xl bg-transparent border-b border-white mb-4 md:mb-0"
              />
            </div>

            {/* PHONE NUMBER */}
            <div className="w-full">
              <label
                htmlFor="phoneNumber"
                className="text-sm pl-1 font-medium block"
              >
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full pl-1 h-[56px] rounded-2xl bg-transparent border-b border-white mb-4 md:mb-0"
              />
            </div>
          </div>

          {/* MESSAGE INPUT */}
          <div className="w-full md:col-span-2">
            <label htmlFor="message" className="text-sm pl-1 font-medium block">
              Message
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full h-[102px] bg-transparent border border-white px-4 rounded-2xl placeholder-top mb-4"
              placeholder="Type your message here"
            />
          </div>

          {/* SEND BUTTON */}
          <div className="flex justify-center md:justify-end">
            <button className="hover:bg-avidBrown flex items-center border border-white rounded-full px-8 py-4">
              Send Message <ChevronRight className="ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
