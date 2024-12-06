import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between font-bold border-b border-black w-full h-11">
      <div className="flex flex-row font-bold text-xl items-center">
        <img className="w-12" src="/AvidLogo.svg" alt="avid logo" />
        <h2>AvidStudio</h2>
      </div>
      <div className="lg:hidden flex">
        <Link to="Login">
          <li className="flex items-center cursor-pointer px-6">
            <LogOut className="text-red-500 hover:text-red-700" />
            
          </li>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
