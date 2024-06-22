import React from 'react';
import { Link } from 'react-scroll';


export default function Footer() {
  const instagramClick = () => {
    window.open('https://www.instagram.com/fuelemyofficial/', '_blank');
  };

  return (
    <div className='border-t-2 border-[#FF4400] bg-[#34260e] p-3 flex flex-col items-center md:mt-24'>
      <div className='w-[24px] flex gap-4 -ml-32 py-4'>
        <img onClick={instagramClick} src={"/Footer/instagram.svg"} alt="instagram-icon"/>
        <img src={"/Footer/linkedin.svg"} alt="linkedin-icon" />
        <img src={"/Footer/x.svg"} alt="x-icon" />
        <img src={"/Footer/gmail.svg"} alt="gmail-icon" />
        <img src={"/Footer/facebook.svg"} alt="facebook-icon" />
      </div>
      <div className='flex gap-4 ml-6 py-4 items-center text-[13px] sm:text-base'>
        <Link to="home" spy={true} smooth={true} duration={500} className='hover:text-gray-300 hover:border-b-2 hover:border-[#FF4400]'>Home</Link>
        <Link to="features" spy={true} smooth={true} duration={500} className='hover:text-gray-300 hover:border-b-2 hover:border-[#FF4400]'>Features</Link>
        <span className='hover:text-gray-300 text-center hover:border-b-2 hover:border-[#FF4400]'>Contact Us</span>
        <span className='hover:text-gray-300 text-center hover:border-b-2 hover:border-[#FF4400]'>Try a Demo</span>
      </div>
    </div>
  )
}
