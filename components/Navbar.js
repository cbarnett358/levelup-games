import React from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';
import { QuantityDisplay } from './AddToCartBtn'; 
import { TradeQuantityDisplay } from './TradeInBtn';


export function NavBar({ quantity, tradeQuantity }) {
  return (
    <main className="bg-primary drop-shadow-xl">
      <div className="navbar py-4 xl:container mx-auto">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost">
            <img src="/levelUP_3d.png" alt="levelUP Games" 
            className="
            logo 
            w-32
           md:w-44
            
            
            "
            />
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="hidden md:flex flex-row items-center justify-center gap-2 ">
            <SearchBar />
          </div>
          <div className="dropdown dropdown-end md:hidden 
          
          ">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <button className="icon-32 material-icons text-light">search</button>
            </label>
            <ul tabIndex={0} className="right-0 
            
            mt-3 p-2 shadow menu dropdown-content bg-base-100 rounded-box w-content
            bg-light  
          
            ">
              <SearchBar />
            </ul>
          </div>
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle hover:btn-border-none text-xs text-light font-mainfont normal-case"
          >
            <div className="indicator " >
              <Link href="/cart">
                <button className="hover:animate-pulse
 icon-32 material-icons text-light">shopping_bag</button>
              </Link>
              <span className="border-none shadow-lg badge badge-sm bg-secondary text-light indicator-item">
                <QuantityDisplay quantity={quantity} />
              </span>
            </div>
            Cart
          </label>
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle hover:btn-border-none text-xs text-light font-mainfont normal-case"
          >
            <div className="indicator">
              <Link href="/cart">
                <button className="hover:animate-pulse
 icon-32 material-icons text-light">autorenew</button>
              </Link>
              <span className="hover:animate-pulse
border-none shadow-lg badge badge-sm bg-accent text-dark indicator-item">
              <TradeQuantityDisplay quantity={tradeQuantity} />
              </span>
            </div>
            Trade-In
          </label>
        </div>
      </div>
    </main>
  );
}
