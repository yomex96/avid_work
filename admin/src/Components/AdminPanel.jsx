import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";

const AdminPanel = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active section based on current path
  const getActiveSectionFromPath = () => {
    const pathMap = {
      '/admin/profile': 'Profile',
      '/admin/services': 'Services',
      '/admin/clients': 'Clients',
      '/admin/bookings': 'Bookings',
      '/admin/messages': 'Messages',
      '/admin/create-user': 'Create User'
    };
    return pathMap[location.pathname] || 'Profile';
  };

  const [activeSection, setActiveSection] = useState(getActiveSectionFromPath());

  // Update localStorage whenever activeSection changes
  useEffect(() => {
    localStorage.setItem("activeSection", activeSection);
  }, [activeSection]);

  // Handle menu item click to navigate to the correct route
  const handleMenuItemClick = (section) => {
    setActiveSection(section);
    
    const routeMap = {
      'Profile': '/admin/profile',
      'Services': '/admin/services',
      'Clients': '/admin/clients',
      'Bookings': '/admin/bookings',
      'Messages': '/admin/messages',
      'Create User': '/admin/create-user'
    };

    navigate(routeMap[section]);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar
        onMenuItemClick={handleMenuItemClick}
        activeSection={activeSection}
      />

      {/* Main Section */}
      <div className="w-full h-full p-8 bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;