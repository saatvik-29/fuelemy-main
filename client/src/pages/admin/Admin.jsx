import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import Vehicle from "./components/Vehicle";
import Driver from "./components/Driver";
import Wallet from "./components/Wallet";
import { IoHomeOutline, IoWalletOutline } from "react-icons/io5";
import { FiTruck } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";

export default function Admin() {
  const [activeComponent, setActiveComponent] = useState("Dashboard");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Dashboard":
        return <Dashboard />;
      case "Vehicle":
        return <Vehicle />;
      case "Driver":
        return <Driver />;
      case "Wallet":
        return <Wallet />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="bg-[#1e1e1e] min-h-screen max-h-2xl md:h-fit md:sticky">
      <header className="p-1 flex items-center justify-between bg-black px-4 h-16 border-b-[2px] border-slate-900 md:sticky md:left-0 md:top-0 z-50">
        <img src={"/logo.svg"} alt="fuelemy-logo" className="size-12" />
        <img
          src={"/Home/Hero.svg"}
          alt="fuelemy-logo"
          className="size-12 rounded-full md:absolute md:right-[5%]"
        ></img>
      </header>

      <div className="flex">
        <footer className="p-4 bg-black flex md:flex-col justify-around md:justify-normal md:gap-10 fixed md:sticky md:top-16 bottom-0 w-full h-16 md:min-h-screen md:w-24 md:rounded-none items-center z-50">
          <div
            className={`p-2 rounded-full ${activeComponent === 'Dashboard' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
            onClick={() => setActiveComponent('Dashboard')}
          >
            <IoHomeOutline size={24} />
          </div>
          <div
            className={`p-2 rounded-full  ${activeComponent === 'Vehicle' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
            onClick={() => setActiveComponent('Vehicle')}
          >
            <FiTruck size={24} />
          </div>
          <div
            className={`p-2 rounded-full ${activeComponent === 'Driver' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
            onClick={() => setActiveComponent('Driver')}
          >
            <FaRegUser size={20} />
          </div>
          <div
            className={`p-2 rounded-full ${activeComponent === 'Wallet' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
            onClick={() => setActiveComponent('Wallet')}
          >
            <IoWalletOutline size={24} />
          </div>
        </footer>
        <div className="content">{renderComponent()}</div>
      </div>
    </div>
  );
}
