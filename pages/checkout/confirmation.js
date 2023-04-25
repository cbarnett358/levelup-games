import React from 'react';
import Link from 'next/link';


export default function Confirmation() {

    return (
    <main>
<div className="hero min-h-screen bg-light">

  <div className="hero-content text-center leading-none mx-10 md:mx-20">
    <div className="max-w-content">
      <h1 className="text-6xl font-mainfont text-secondary">Thank You For Your Order!</h1>
      <p className="py-6">Thank you for your recent purchase at LevelUp Retro Video Game Exchange! We appreciate your business and hope you enjoy your new retro video game. If you need any assistance with your order or have any feedback, please do not hesitate to contact us.

</p>
<Link href="/"> <button className="p-2 rounded-lg bg-secondary font-mainfont text-light text-lg border-none"
  >Continue Browsing</button> </Link>
     
    </div>
  </div>
</div>    </main>
    )
}