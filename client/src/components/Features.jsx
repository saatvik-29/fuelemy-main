// Features.js
import React from 'react';


export default function Features() {

  const featureData = [
    {
      id: 1,
      title: "Unleash discounts",
      description: "Get exclusive discounts on fuel at our partner stations and watch your profits pump up.",
      image: "assets/1.svg",
      alt: "Unleash discounts"
    },
    {
      id: 2,
      title: "Track fuel expenses effortlessly",
      description: "Ditch the receipts and spreadsheets. We automate fuel expense tracking, giving you total financial control.",
      image: "assets/2.svg",
      alt: "Track fuel expenses effortlessly"
    },
    {
      id: 3,
      title: "Shield your fuel, shield your peace of mind",
      description: "Breathe easy with comprehensive fuel insurance. Theft or contamination? We've got your back. Comprehensive fuel insurance protects you from theft and contamination, letting you breathe easy on the road.",
      image: "assets/3.svg",
      alt: "Shield your fuel, shield your peace of mind"
    },
    {
      id: 4,
      title: "Find your perfect fuel stop",
      description: "Navigate like a pro with our data-driven recommendations. We'll guide you to the most cost-effective and conveniently located fuel stations, every time.",
      image: "assets/4.svg",
      alt: "Find your perfect fuel stop"
    },
    {
      id: 5,
      title: "Pay with peace of mind",
      description: "Say goodbye to security anxieties. Our cutting-edge payment system is built for speed and ultimate security, reducing payment times at the pump.",
      image: "assets/5.svg",
      alt: "Pay with peace of mind"
    },
    {
      id: 6,
      title: "Fuel your knowledge, fuel your success",
      description: "Make informed decisions with real-time fuel cost and density information. Every kilometer counts, and we empower you to optimize every drop.",
      image: "assets/6.svg",
      alt: "Fuel your knowledge, fuel your success"
    }
  ];
  

  return (
    <div className='flex flex-col'>
      <h2 className='text-center text-[28px] sm:text-[47px] font-semibold'>Features</h2>
      <div className="flex flex-col">
      {featureData.map((feature, index) => (
        <Card key={feature.id} {...feature} reverse={index % 2 !== 0} />
      ))}
    </div>
    </div>
  );
}


const Card = ({ title, description, image, alt, reverse }) => {
  return (
    <div id="features" className={`features-section flex flex-col items-center md:mx-4 lg:mx-24 md:flex-row ${reverse ? 'md:flex-row-reverse' : ''} my-2 sm:my-0 sm:border-b border-white p-5`}>
      <div className="">
        <img className="md:w-[15rem] md:h-[15rem] w-[8rem] h-[8rem] self-center mx-auto" src={image}/>
      </div>
      <div className="flex flex-col lg:order-2 lg:text-2xl mx-2 mt-10 sm:mt-0 md:text-left lg:ml-48 md:w-[500px] gap-y-3 text-left">
        <span className={`font-bold text text-[27px] text-center sm:text-left sm:text-[41px] md:leading-[55px] ${reverse ? 'md:self-start' : 'md:self-end'}`}>{title}</span>
        <span className={`font-thin text text-[11px] text-center sm:text-left sm:text-[15px] mr-6 md:leading-[30px] ${reverse ? 'md:self-start' : 'md:self-end'} `}>{description}</span>
      </div>
    </div>
  );
};