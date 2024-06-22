import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <div className="absolute w-48 h-48 left-[-80px] top-[90%] bg-[#FF4400] opacity-20 blur-[100px] hidden lg:block"></div>
      <div className="absolute w-48 h-48 right-[-8px] top-[180%] bg-[#FF4400] opacity-20 blur-[100px] hidden lg:block"></div>
      <div className="absolute w-48 h-48 left-[-80px] top-[260%] bg-[#FF4400] opacity-20 blur-[100px] hidden lg:block"></div>
      <div className="absolute w-48 h-48 right-[-8px] top-[320%] bg-[#FF4400] opacity-20 blur-[100px] hidden lg:block"></div>
      {/* <div className="absolute w-48 h-48 left-[-80px] top-[400%] bg-[#FF4400] opacity-20 blur-[100px] hidden lg:block"></div> */}
      <Navbar/>
      <Hero />
      <Features />
      <Footer/>
    </>
  );
}
