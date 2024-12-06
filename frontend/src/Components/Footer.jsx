// import { useEffect, useState } from 'react';
import { useEffect, useState } from 'react';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useStoreContext } from "../context/StoreContext";



const Footer = () => {
  const { companyInfo } = useStoreContext();

  const linkedinUsername = companyInfo.social.linkedin;

  const facebookUsername = companyInfo.social.facebook;



  return (
    <>
      <div className="flex flex-col justify-center items-center mt-24 px-4 w-full overflow-x-hidden">
        {/* Divider line */}
        <div className="w-full h-[3px] max-w-7xl bg-black mb-12" />

        {/* Logo */}
        <div className="flex items-center -ml-6 justify-center mb-4 w-[142px] h-7 gap-2">
          <Link to="/" className="flex items-center">
            <img src="/AvidLogo.svg" alt="Logo" className="h-12" />
            <h4 className="text-lg font-bold">AvidStudio</h4>
          </Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mb-4">

        {facebookUsername && (
          // {companyInfo.social.facebook && (
            <a 
            href={`https://web.facebook.com/${facebookUsername.replace(/\s+/g, '')}`} 
            target="_blank" 
            rel="noopener noreferrer"
          > 
            {/* <a href={companyInfo.social.facebook} target="_blank" rel="noopener noreferrer"> */}
              <FaFacebook size={30} />
            </a>
          )}

{companyInfo.social.instagram && (
  <a 
    href={`https://www.instagram.com/${companyInfo.social.instagram}`} 
    target="_blank" 
    rel="noopener noreferrer"
  >
    <FaInstagram size={30} />
  </a>
)}


         {linkedinUsername && (
          // {companyInfo.social.linkedin && (
            // <a href={companyInfo.social.linkedin} target="_blank" rel="noopener noreferrer">
            //   <FaLinkedin size={30} />
            // </a>
            
            <a 
            href={`https://www.linkedin.com/in/${linkedinUsername}`} 
            target="_blank" 
            rel="noopener noreferrer"
          > 
           <FaLinkedin size={30} />
          </a>

          )}
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:flex-row space-y-2 md:space-y-0 md:space-x-8 mt-8">
          <p>{companyInfo.phone || 'Phone not available'}</p> 
          <p>|</p>
          <p>{companyInfo.email || 'Email not available'}</p> 
        </div>
        <div className="flex flex-col items-center md:flex-row space-y-2 md:space-y-0 md:space-x-8 mt-3">
        <p>{companyInfo.address || 'Address not available'}</p>
        </div>



      {/* Description */}
      <div className="mt-4 text-center px-4">
          <p>{companyInfo.about || 'About us information not available.'}</p>
        </div>
        </div>

      {/* Bottom divider line */}
      <div className="bg-black h-[1px] my-8 mx-auto max-w-7xl" />

      {/* Copyright */}
      <p className="text-center pb-12">© 2024 Avid Studios</p>
    </>
  );
};

export default Footer;

// const Footer = () => {
//   const [companyInfo, setCompanyInfo] = useState({
//     phone: '',
//     address: '',
//     about: '',
//     social: {
//       facebook: '',
//       instagram: '',
//       linkedin: ''
//     }
//   });

  // useEffect(() => {
  //   const fetchCompanyInfo = async () => {
  //     try {
  //       // Determine the URL based on the environment
  //       const url =
  //         window.location.hostname === 'localhost'
  //           ? 'http://localhost:5000/api/company-info'
  //           : '/api/company-info'; // Use relative URL in production

  //       const response = await fetch(url);
  //       const data = await response.json();
  //       setCompanyInfo(data);
  //     } catch (error) {
  //       console.error('Error fetching company info:', error);
  //     }
  //   };
  //   fetchCompanyInfo();
  // }, []);