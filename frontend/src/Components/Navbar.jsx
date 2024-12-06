import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [navItems, setNavItems] = useState("home");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileMenuItemClick = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="fixed top-0 left-0 w-full h-12 bg-white shadow-2xl z-50 flex justify-between items-center px-6 text-black md:pl-60">
      <div className="md:ml-[-100px] flex items-center w-[142px] h-7 gap-2">
        <Link to="/" className="flex items-center">
          <img src="/AvidLogo.svg" alt="Logo" className="h-12 hover:scale-125" />
          <h4 className="text-lg font-bold">AvidStudio</h4>
        </Link>
      </div>

      {/* DESKTOP NAVBAR */}
      <div className="hidden sm:flex items-center justify-between gap-12 md:ml-[100px]">
        <Link to="/">
          <button
            onClick={() => setNavItems("home")}
            className={`transition-all duration-200 ${
              navItems === "home" ? "active" : ""
            } hover:text-avidBrown hover:scale-105`}
          >
            Home
          </button>
        </Link>
        <Link to="services">
          <button
            onClick={() => setNavItems("services")}
            className={`transition-all duration-200 ${
              navItems === "services" ? "active" : ""
            } hover:text-avidBrown hover:scale-105`}
          >
            Services
          </button>
        </Link>
        <Link to="contact">
          <button
            onClick={() => setNavItems("contact")}
            className={`transition-all duration-200 ${
              navItems === "contact" ? "active" : ""
            } hover:text-avidBrown hover:scale-105`}
          >
            Contact Us
          </button>
        </Link>
      </div>
      <div className="ml-24">
        <Link to="booking">
          <button className="hidden sm:flex bg-black text-white rounded-full px-4 py-2 hover:bg-avidBrown">
            Book Now
          </button>
        </Link>
      </div>

      {/* LUCIDE MENU ICON */}
      <div className="flex items-center z-50">
        <div className="sm:hidden">
          {isMobileMenuOpen ? (
            <X
              onClick={toggleMobileMenu}
              className="text-red-500 size-10 cursor-pointer z-[100]"
            />
          ) : (
            <Menu
              size={36}
              className="w-10 h-10 cursor-pointer z-[100]"
              onClick={toggleMobileMenu}
            />
          )}
        </div>
      </div>

      {/* MOBILE NAVBAR */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 flex flex-col items-center p-6 text-white gap-12 text-2xl sm:hidden z-40 bg-[#333333]">
          <button
            onClick={() => handleMobileMenuItemClick("/")}
            className="hover:underline"
          >
            Home
          </button>
          <button
            onClick={() => handleMobileMenuItemClick("/about")}
            className="hover:underline"
          >
            About Us
          </button>
          <button
            onClick={() => handleMobileMenuItemClick("/services")}
            className="hover:underline"
          >
            Services
          </button>
          <button
            onClick={() => handleMobileMenuItemClick("/clients")}
            className="hover:underline"
          >
            Clients
          </button>
          <button
            onClick={() => handleMobileMenuItemClick("/contact")}
            className="hover:underline"
          >
            Contact Us
          </button>
          <button
            onClick={() => handleMobileMenuItemClick("/Booking")}
            className="hover:bg-amber-900"
          >
            Book Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
