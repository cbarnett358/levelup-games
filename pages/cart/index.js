import Link from "next/link";
import React, { useEffect, useState } from "react";
import 'material-icons/iconfont/material-icons.css';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [tradeInCartItems, setTradeInCartItems] = useState([]);

  const calculateTotal = (items) => {
    let total = 0;
    items.forEach((product) => {
      total += product.quantity * product.product_price; // Modify this based on your cart item structure
    });
    return total.toFixed(2);
  };

  const finalTotal = () => {
    let total = calculateTotal(cartItems) - calculateTradeInTotal(tradeInCartItems);
    if (total < 0) {
      return "+" + Math.abs(total);
    } else {
      return total.toFixed(2);
    }
  };

  const calculateTradeInTotal = (items) => {
    let total = 0;
    items.forEach((product) => {
      total += product.trade_quantity * product.product_price; // Modify this based on your cart item structure
    });
    return total.toFixed(2);
  };

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCartItems(JSON.parse(cart));
    }
  }, []);

  useEffect(() => {
    const tradeInCart = localStorage.getItem("tradeInCart");
    if (tradeInCart) {
      setTradeInCartItems(JSON.parse(tradeInCart));
    }
  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedItems = cartItems.map((product) => {
      if (product.product_id === productId) {
        return { ...product, quantity: newQuantity };
      }
      return product;
    });
    setCartItems(updatedItems);
  };

  const handleTradeQuantityChange = (productId, newQuantity) => {
    const updatedItems = tradeInCartItems.map((product) => {
        if (product.product_id === productId) {
            return { ...product, trade_quantity: newQuantity };
        }
        return product;
    });
    setTradeInCartItems(updatedItems);
    };

    const handleDeleteCartItem = (productId) => {
      const updatedItems = cartItems.filter(
        (product) => product.product_id !== productId
      );
      setCartItems(updatedItems);
      localStorage.setItem("cart", JSON.stringify(updatedItems));
    };
    
    const handleDeleteTradeInCartItem = (productId) => {
      const updatedItems = tradeInCartItems.filter(
        (product) => product.product_id !== productId
      );
      setTradeInCartItems(updatedItems);
      localStorage.setItem("tradeInCart", JSON.stringify(updatedItems));
    };
    
  return (
    
    <main className="bg-white">
        <div className="text-sm breadcrumbs bg-primary container  drop-shadow-xl">
  <ul className=" xl:container  mx-auto px-8 sm:px-8 md-px-0 text-light font-mainfont ">
  <li>
              <Link href="/">
                <span className="material-icons">home</span>
                Home
              </Link>
            </li>
            <li>
              <a>
                <span className="material-icons">shopping_bag</span>
                Shopping Bag
              </a>
            </li>
  </ul>
</div>
      <section className="  xl:container mx-auto mt-10 px-8 sm:px-8 md-px-0">
        <div className="flex flex-col w-full lg:flex-row ">
            
          <div className="grid flex-grow h-content card bg-white rounded-box border border-light">
            <div className="overflow-x-auto ">
            <h1 className="font-mainfont font-bold text-secondary text-5xl mx-2">Shopping Bag</h1>

            <h2 className="font-mainfont font-bold text-dark mx-2 text-3xl">                    <span className="material-icons">shopping_bag</span>
Purchases:</h2>
{cartItems.length === 0 ? (
 <div>
                <p className="font-mainfont text-xl text-dark mx-2">
                  The cart is empty &nbsp;   
              <Link href="/" className="underline text-secondary">
continue shopping.
                </Link></p></div>
              ) : (

              <table className="table w-full "> 
                <thead >
                  <tr >
                    <th className="border text-lg bg-secondary text-light font-mainfont text-bold">Bag</th>
                    <th className="border text-lg bg-secondary text-light font-mainfont text-bold">Product Name</th>
                    <th className="border text-lg bg-secondary text-light font-mainfont text-bold">Product Price</th>
                    <th className="border text-lg bg-secondary text-light font-mainfont text-bold">Product Quantity</th>
                    <th className="border text-lg bg-secondary text-light font-mainfont text-bold">Product Subtotal</th>
                    <th className="border text-lg bg-secondary text-light font-mainfont text-bold ">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((product) => (
                    <tr key={product.product_id}>
                      <td className="border bg-white font-mainfont">
                        <div className="avatar">
                          <div className="mb-8 rounded-btn w-24 h-24">
                            <img
                              src={
                                product.product_id
                                  ? `https://res.cloudinary.com/dabmn9eje/image/upload/v1683582484/${product.product_id}.png`
                                  : "https://placehold.co/600x400"
                              }
                              alt="Game Cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://placehold.co/600x600/6C30BF/FFFF/?text=Product Cover";
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="bg-white border font-mainfont">{product.product_name}</td>
                      <td className="bg-white border font-mainfont">${product.product_price}</td>
                      <td className="bg-white border font-mainfont">
                        <input
                        className="w-12 h-10 bg-light text-dark rounded-box 
                        text-center
                        "
                          type="number"
                          min="1"
                          value={product.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              product.product_id,
                              parseInt(e.target.value)
                            )
                          }
                        />
                      </td>
                      <td className="bg-white border  font-mainfont"> ${product.product_price * product.quantity}</td>
                    <td className="bg-white border  font-mainfont ">  <button
                    className="btn btn-circle btn-sm btn-error material-icons text-light 
                    
                    "
                    onClick={() => handleDeleteCartItem(product.product_id)}
                    >
                  delete  </button></td>
                    </tr>
                   
                  ))}
                </tbody>
              </table>     )}
            </div>


            <h2 className="font-mainfont font-bold text-dark mx-2 text-3xl mt-6">
              
                    <span className="material-icons">autorenew</span>
             
               Trade Bag</h2>

         
            <div className="overflow-x-auto">
            {tradeInCartItems.length === 0 ? (
                <div>
                <p className="font-mainfont text-xl text-dark mx-2">
                  You have nothing to trade in &nbsp;   
              <Link href="/" className="underline text-secondary">
browse for trades.
                </Link></p></div>
              ) : (

              <table className="table w-full">
                <thead>
                  <tr>
                    <th className="border text-lg bg-accent text-dark font-mainfont text-bold">Trades</th>
                    <th className="border text-lg bg-accent text-dark font-mainfont text-bold">Product Name</th>
                    <th className="border text-lg bg-accent text-dark font-mainfont text-bold">Product Trade Price</th>
                    <th className="border text-lg bg-accent text-dark font-mainfont text-bold">Product Quantity</th>
                    <th className="border text-lg bg-accent text-dark font-mainfont text-bold">Product Subtotal</th>
                    <th className="border text-lg bg-accent text-dark font-mainfont text-bold">Remove</th>
                  </tr>
                </thead>
                <tbody>
            {tradeInCartItems.map((product) => (
               <tr key={product.product_id}>
               <td className="bg-white border font-mainfont">
                 <div className="avatar">
                   <div className="mb-8 rounded-btn w-24 h-24">
                     <img
                       src={
                         product.product_id
                           ? `https://res.cloudinary.com/dabmn9eje/image/upload/v1683582484/${product.product_id}.png`
                           : "https://placehold.co/600x400"
                       }
                       alt="Game Cover"
                       onError={(e) => {
                         e.target.onerror = null;
                         e.target.src =
                           "https://placehold.co/600x600/6C30BF/FFFF/?text=Product Cover";
                       }}
                     />
                   </div>
                 </div>
               </td>
               <td className="bg-white border font-mainfont">{product.product_name}</td>
               <td className="bg-white border font-mainfont">${product.product_tradeval}</td>
               <td className="bg-white border font-mainfont">

                <input
                className="w-12 h-10 bg-light text-dark rounded-box
                text-center
                "
                    type="number"
                    min="1"
                    value={product.trade_quantity}
                    onChange={(e) =>
                        handleTradeQuantityChange(
                        product.product_id,
                        parseInt(e.target.value)
                        )
                    }
                />
                
               </td>
                
               <td className="bg-white border font-mainfont">${product.product_tradeval * product.trade_quantity}</td>
               <td className="bg-white border font-mainfont">
               <button
                                       className="btn btn-circle btn-sm btn-error material-icons text-light "

                    onClick={() => handleDeleteTradeInCartItem(product.product_id)}
                    >
                    delete</button>
               </td>
             
             </tr>
           ))}
         </tbody>
       </table>      )}
     </div>
   </div>
   <div className="divider lg:divider-horizontal px-4"></div>
   <div className=" flex-grow min-h-content px-6 card bg-light rounded-box ">
   <h1 className="font-mainfont font-bold text-secondary text-5xl">Bag Totals</h1>
     <h2 className="mt-3 font-mainfont text-xl font-bold text-dark">Total: ${calculateTotal(cartItems)}</h2>
     <h2 className="mt-3 font-mainfont text-xl font-bold text-dark">Trade In Total: ${calculateTradeInTotal(tradeInCartItems)}</h2>
                       
     <h2 className="mt-3 font-mainfont text-2xl font-bold text-dark">Total: ${finalTotal(cartItems, tradeInCartItems)}</h2>
     

     <Link href="/cart/payment"> <button className="mt-6 btn bg-secondary border-none text-light 
    hover:bg-pink-500 drop-shadow-lg
    transition duration-500 ease-in-out transform font-mainfont  hover:scale-105
     font mainfont font-bold text-lg hover:animate-pulse mb-2">Proceed To Payment</button></Link>
   </div>


                       
   
 </div>
</section>
</main>
);
}