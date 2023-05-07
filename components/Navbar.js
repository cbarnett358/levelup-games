//make a search bar component that is reusable to search for products from the database

import React from 'react'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';



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

   <main className='bg-primary'>
  
      <div className="navbar py-4      xl:container  
 mx-auto      ">     

    <div className="flex-1 ml-8 ">
    <Link href="/"> 
      
          
        <img src="/levelUP_Logo.png" alt="levelUP Games" width={180} height={50} />
       
        </Link>
        
      </div>
      <div className="flex-none gap-2 mr-8">
        
      <div className=" 
      
      
      hidden md:flex flex-row items-center justify-center gap-2
      ">
      <SearchBar></SearchBar>
</div> <div className="dropdown dropdown-end  
      md:hidden
       
">
      <label tabIndex={0} className="btn btn-ghost btn-circle ">
      <button className="icon-32 material-icons text-light "
  >search</button>
      </label>
      <ul tabIndex={0} className="mt-3 p-2 shadow menu  dropdown-content bg-base-100 rounded-box w-content">
        
        <SearchBar></SearchBar>
      </ul>
    </div>
   
      <label tabIndex={0} className="btn btn-ghost btn-circle
     hover:btn-border-none
      ">
      
        <div key={total} className="indicator  ">
        <Link href="/checkout"> <button className="icon-32 material-icons text-light "
  >shopping_bag</button> </Link>

          <span className="border-none shadow-lg badge badge-sm bg-secondary  text-light indicator-item ">{cartTotal (cart)}</span>
          
        </div>
      </label>     

      <label tabIndex={0} className="btn btn-ghost btn-circle
     hover:btn-border-none
      ">
      
        <div key={total} className="indicator  ">
        <Link href="/checkout"> <button className="icon-32 material-icons text-light "
  >autorenew</button> </Link>

          <span className="border-none shadow-lg badge badge-sm bg-tertiary text-dark indicator-item ">{cartTotal (cart)}</span>
          
        </div>
      </label>
    </div>
      </div>
      </main>
    )
}