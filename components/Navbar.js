import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import Link from 'next/link';

function cartItemsTotal (cart) {
  let total = 0;
  cart.map((product) => {
      total += product.quantity;
  })
  return total;
}

//dynamically updates cart quantity in navbar when item is added to cart
function cartTotal (cart) {
  let total = 0;
  cart.map((product) => {
      total += product.quantity;
  })
  return total;
}






export function NavBar() {


  
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);  

  useEffect(() => {

      const cart = localStorage.getItem('cart');
      if (cart) {
         let cartList = JSON.parse(cart);
         let totalVal = 0; 
         cartList.map((product) => {
          
          totalVal  += product.product_price;
         })

         setTotal(totalVal);
          setCart(JSON.parse(cart));
      }

    }, []);

    return (
      <div className="navbar bg-primary py-4">
    <div className="flex-1 ml-8">
    <Link href="/"> 
      
          
        <img src="/levelUP_Logo.png" alt="levelUP Games" width={180} height={50} />
       
        </Link>
        
      </div>
      <div className="flex-none gap-2 mr-8">
        
      <div className="border-noneform-control">
  <div className="input-group  ">
    <input type="text" placeholder="Search…" className="input bg-light border-none " />
    <button className="btn btn-square bg-secondary
    hover:bg-secondary
    border-none
    ">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-light" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </button>
  </div>
</div>
        
      <label tabIndex={0} className="btn btn-ghost btn-circle
     hover:btn-border-none
      ">
      
        <div key={total} className="indicator  ">
        <Link href="/checkout/cart"> <button className="icon-32 material-icons text-light "
  >shopping_bag</button> </Link>

          <span className="border-none shadow-lg badge badge-sm bg-tertiary text-dark indicator-item ">{cartTotal (cart)}</span>
        </div>
      </label>
     
    </div>
      </div>

    )
}