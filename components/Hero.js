
import React from 'react';

export function Hero() {
  return (
    <div className="hero 
    min-h-content
    pt-10
    pb-40
    
    
    bg-light">
 <div className="hero-content flex-col mx-20 max-w-7lg
 lg:flex-row-reverse ">
   
    <img src="/leveluphero.png" className="max-w-xs md:max-w-md lg:max-w-lg rounded-lg " />
    <div>
        
      <h1 className="leading-none text-secondary font-mainfont text-6xl lg:text-7xl font-bold">levelUP Your Collection</h1>
      <p className="pb-6 text-dark pt-3
     
      ">LevelUp Retro Video Game Exchange is a unique gaming store that specializes in providing a wide selection of classic and retro video games. Whether you&apos;re a collector, an avid gamer, or just looking for a trip down memory lane, LevelUp we have something for everyone. With a passion for retro gaming and a commitment to customer satisfaction, LevelUp Retro Video Game Exchange is the go-to destination for gamers of all ages and backgrounds. So step back in time and experience the nostalgia of classic video games.</p>
      <div
      className='
      space-x-3
      '
      >
      <button className=" hover:bg-pink-500 btn btn-primary bg-secondary border-none font-mainfont text-lg text-light">Get Started</button>
      <button className="hover:bg-yellow-400 btn btn-secondary  bg-tertiary border-none text-dark font-mainfont text-lg ">Get Started</button>
      </div>
    </div>
  </div>
</div>
  );
}