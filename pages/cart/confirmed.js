import React from 'react';
import Link from 'next/link';


export default function Confirmed() {

    return (
    <main>
<div className="hero min-h-screen bg-light">

  <div className="hero-content text-center leading-none mx-10 md:mx-20">
    <div className="max-w-content">   <i className="icon-48 mb-2 text-secondary material-icons-outlined ">videogame_asset</i> 
      <h1 className="text-6xl font-mainfont text-secondary">Thank You For Your Order!</h1>
      <p className="py-6">Thank you for your recent purchase at LevelUp Retro Video Game Exchange! We appreciate your business and hope you enjoy your new retro video game. If you need any assistance with your order or have any feedback, please do not hesitate to contact us.

</p>
<Link href="/"> <button className=" btn bg-secondary border-none text-light
    hover:bg-pink-500 drop-shadow-lg
    transition duration-500 ease-in-out transform font-mainfont  hover:scale-105
     font mainfont font-bold text-lg hover:animate-pulse
"
  >Continue Browsing</button> </Link>
     
    </div>
  </div>
</div>    </main>
    )
}