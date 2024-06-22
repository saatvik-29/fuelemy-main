import React from "react";
import { FaArrowRight } from "react-icons/fa6";

export default function Hero() {
  return (
    <div id="home" className="home-section flex flex-col md:flex-row justify-around md:justify-between items-center overflow-hidden">
      <div className="flex flex-col py-3 mx-12 md:mx-24 gap-y-6">
        <span className="text-4xl md:text-5xl font-semibold md:-mt-24 -mt-16 mb-2">
          Tag<span className="text-[#FF4400]">line</span>
        </span>
        <p className="md:w-[35rem] text-[#A8A8A8] md:text-[1.6rem]">
          Lorem ipsum dolor sit amet consectetur. Orci ut lacus id vitae odio
          enim pellentesque porttitor vel.
        </p>
        <div className="flex gap-12 md:mt-24 text-xs md:text-base ">
          <span className="bg-[#FF4400] text-black font-medium rounded-md px-3 py-2 hover:border-[#FF4400] hover:text-white flex items-center gap-2">
            Explore
            <FaArrowRight />
          </span>
          <span className=" border-2 border-[#FF4400] text-[#FF4400] font-medium rounded-md px-2 py-1 hover:text-black hover:bg-[#FF4400]">
            Try a demo
          </span>
        </div>
      </div>
      <img
        src={"/Home/Hero.svg"}
        alt="laptop"
        className="hidden md:block md:w-[40rem] lg:ml-0"
      />
      <img
        src={"/Home/Hero_mobile.svg"}
        alt="laptop"
        className="w-[30rem] md:hidden "
      />
    </div>
  );
}
