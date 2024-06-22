import React, { useState } from "react";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-between items-center w-full h-16 text-white px-4">
        <a href="/" className="flex items-center">
          <img src="/logo.svg" alt="Logo" className="w-20 mr-2" />
        </a>
        <div className="flex items-center space-x-4">
          <Link
            to="features"
            spy={true}
            smooth={true}
            duration={500}
            className="hover:underline"
          >
            Features
          </Link>
          <span className="hover:underline">About Us</span>
          <span className="border-2 border-[#FF4400] text-[#FF4400] font-medium rounded-md px-2 py-1 hover:text-black hover:bg-[#FF4400]">
            Try a demo
          </span>
          <Link
            to="/signin"
            className="bg-[#FF4400] text-black rounded-md px-3 py-2 hover:border-[#FF4400] hover:text-white text-sm"
          >
            SIGN IN
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        {/* Hamburger Icon */}
        <div className="flex justify-between items-center h-16 px-4">
              <a href="/" className="flex items-center">
                <img src="/logo.svg" alt="Logo" className="w-16 mr-2" />
              </a>
          <img
            src="/sidebar.svg"
            alt="Sidebar"
            className="w-8 cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>

        {/* Sidebar Content */}
        {isOpen && (
          <div className="fixed top-0 left-0 h-full w-full bg-[#151009] text-white py-4 px-6">
            <div className="flex justify-end mb-4">
              <span className="text-3xl font-mono font-medium" onClick={toggleSidebar}>X</span>
            </div>
            <div className="flex flex-col space-y-4 items-center my-5 gap-1">
              <Link
                to="features"
                spy={true}
                smooth={true}
                duration={500}
                className="text-lg hover:underline"
                onClick={toggleSidebar}
              >
                Features
              </Link>
              <span className="text-lg hover:underline" onClick={toggleSidebar}>
                About Us
              </span>
              <span
                className="border-2 border-[#FF4400] text-[#FF4400] font-medium rounded-md px-2 py-1 hover:text-black hover:bg-[#FF4400] w-fit"
                onClick={toggleSidebar}
              >
                Try a demo
              </span>
              <Link
                to="/signin"
                className="bg-[#FF4400] text-black rounded-md px-4 py-1 hover:border-[#FF4400] hover:text-white text-lg w-fit"
                onClick={toggleSidebar}
              >
                SIGN IN
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
