import PropTypes from 'prop-types';
import { BsPersonFill, BsPersonFillGear } from 'react-icons/bs';
import { IoIosPeople } from 'react-icons/io';
import { ImAddressBook } from 'react-icons/im';
import { LogOut, MailPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { useEffect } from 'react';
import { CircleUserRound } from 'lucide-react';

// import { TbCashRegister } from 'react-icons/tb';

import StoreContext from "../context/StoreContext";
import useAuthStorage from '../storage/authenticatedUser'; // Import the auth storage hook


const Sidebar = ({ onMenuItemClick, activeSection}) => {
  const { fetchMessages, bookings, messageCount } = useContext(StoreContext); 
  const totalBookings = bookings.length; // Calculate total bookings
  const navigate = useNavigate();
  const { logout } = useAuthStorage(); // Destructure logout method

   // Fetch messages when the Sidebar mounts
   useEffect(() => {
    fetchMessages();
  }, []);

  const handleItemClick = (section) => {
    onMenuItemClick(section);
  };

  const handleLogout = () => {
    logout(); // Call logout method from auth storage
    navigate('/login'); // Redirect to login page after logout
  };

  

  return (
    <div>
      <div>
      <img className="hidden md:block absolute left-[-25px] top-[60px] w-22 h-28" src="/AvidLogo.svg" alt="avid logo" />
      </div>
      {/* Sidebar for larger screens */}
      <div className="w-[293px] h-[588px] border-b border-r border-black bg-white p-6 hidden lg:block">
        <h2 className="pl-8 text-xl font-bold">Welcome</h2>
        <p className="pl-8 text-lg mt-1 font-semibold">AvidStudio Admin</p>
        <p className="pl-8 text-md">avid@gmail.com</p>
        <hr className="my-4 border-black border-t-1" />
        <ul className="space-y-4">
          
          {/* Sidebar Items */}
          
          <li
            onClick={() => handleItemClick('Profile')}
            className={`flex items-center gap-2 rounded-md cursor-pointer p-2 w-[250px] text-left transition-colors duration-300 ${
              activeSection === 'Profile' ? 'bg-[#C5A592] text-white' : 'hover:text-[#C5A592]'
            }`}
          >
            <BsPersonFill />Profile
          </li>

          <li
            onClick={() => handleItemClick('Services')}
            className={`flex items-center gap-2 rounded-md cursor-pointer p-2 w-[250px] text-left transition-colors duration-300 ${
              activeSection === 'Services' ? 'bg-[#C5A592] text-white' : 'hover:text-[#C5A592]'
            }`}
          >
            <BsPersonFillGear />Services
          </li>

          <li
            onClick={() => handleItemClick('Clients')}
            className={`flex items-center gap-2 rounded-md cursor-pointer p-2 w-[250px] text-left transition-colors duration-300 ${
              activeSection === 'Clients' ? 'bg-[#C5A592] text-white' : 'hover:text-[#C5A592]'
            }`}
          >
            <IoIosPeople />Clients
          </li>


          <li
            onClick={() => handleItemClick('Bookings')}
            className={`flex items-center gap-2 rounded-md cursor-pointer p-2 w-[250px] text-left transition-colors duration-300 ${
              activeSection === 'Bookings' ? 'bg-[#C5A592] text-white' : 'hover:text-[#C5A592]'
            }`}
          >
            <ImAddressBook />Bookings
            <span className="bg-red-500 text-white px-2 py-1 rounded-xl ml-28">
              {totalBookings}
            </span>
          </li>
          
          <li
            onClick={() => handleItemClick('Messages')}
            className={`flex items-center gap-2 rounded-md cursor-pointer p-2 w-[250px] text-left transition-colors duration-300 ${
              activeSection === 'Messages' ? 'bg-[#C5A592] text-white' : 'hover:text-[#C5A592]'
            }`}
          >
            <MailPlus />Messages
            <span className="bg-red-500 text-white px-2 py-1 rounded-xl ml-24">{ messageCount}</span>
          </li>

          {/* <li
            onClick={() => onMenuItemClick('Transactions')}
            className={`flex items-center gap-2 rounded-md cursor-pointer p-2 w-[250px] text-left transition-colors duration-300 ${
              activeSection === 'Transactions' ? 'bg-[#C5A592] text-white' : 'hover:text-[#C5A592]'
            }`}
          >
            <TbCashRegister />Transactions
          </li> */}

        </ul>
        
        <hr className="my-4 border-black border-t-1" />
        

        <div className="text-green-500 hover:text-green-700">
          <li 
            onClick={() => handleItemClick('Create User')}
            className="flex items-center gap-2 rounded-md cursor-pointer p-2 w-[250px] text-left text-green-600 font-semibold transition-colors duration-300 hover:text-green-800"
          >
            <CircleUserRound className="text-green-600 hover:text-green-800" />
            Create User
          </li>
        </div>


        <div className="mt-5 text-red-500 hover:text-red-700">
        <li 
          onClick={handleLogout} 
          className="flex items-center gap-2 rounded-md cursor-pointer p-2 w-[250px] text-left text-red-500 font-semibold transition-colors duration-300 hover:text-red-700"
        >
          <LogOut className="text-red-500 hover:text-red-700" />
          Logout
        </li>
        </div>
      </div>

      {/* MOBILE VIEW FOR SIDEBAR - Icons only */}
      <div className="z-10 fixed bottom-0 left-0 w-full bg-white flex justify-around lg:hidden p-4 shadow-lg border-t border-gray-300">
        <BsPersonFill
          className={`cursor-pointer ${activeSection === 'Profile' ? 'text-[#C5A592]' : ''}`}
          onClick={() => onMenuItemClick('Profile')}
          size={24}
        />
        <BsPersonFillGear
          className={`cursor-pointer ${activeSection === 'Services' ? 'text-[#C5A592]' : ''}`}
          onClick={() => onMenuItemClick('Services')}
          size={24}
        />
        <IoIosPeople
          className={`cursor-pointer ${activeSection === 'Clients' ? 'text-[#C5A592]' : ''}`}
          onClick={() => onMenuItemClick('Clients')}
          size={24}
        />
        <ImAddressBook
          className={`cursor-pointer ${activeSection === 'Bookings' ? 'text-[#C5A592]' : ''}`}
          onClick={() => onMenuItemClick('Bookings')}
          size={24}
        />
        <MailPlus
          className={`cursor-pointer ${activeSection === 'Messages' ? 'text-[#C5A592]' : ''}`}
          onClick={() => onMenuItemClick('Messages')}
          size={24}
        />
        {/* <TbCashRegister
          className={`cursor-pointer ${activeSection === 'Transactions' ? 'text-[#C5A592]' : ''}`}
          onClick={() => onMenuItemClick('Transactions')}
          size={24}
        /> */}
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  onMenuItemClick: PropTypes.func.isRequired,
  activeSection: PropTypes.string.isRequired,
};

export default Sidebar;
