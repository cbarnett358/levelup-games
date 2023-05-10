import React, { useState, useEffect } from 'react';

export function TradeQuantityDisplay({ quantity }) {
  const displayQuantity = isNaN(quantity) ? 0 : quantity;
  return <span>{displayQuantity}</span>;
}

export default function TradeInCartButton({ product, onQuantityChange }) {
  const [tradeQuantity, setTradeQuantity] = useState(0);

  useEffect(() => {
    const tradeInCart = localStorage.getItem('tradeInCart');
    if (tradeInCart) {
      const tradeInCartList = JSON.parse(tradeInCart);
      let quantity = 0;
      tradeInCartList.forEach((item) => {
        quantity += item.trade_quantity;
      });
      setTradeQuantity(quantity);
    }
  }, []);

  const addToTradeInCart = () => {
    const tradeInCart = localStorage.getItem('tradeInCart');
    if (!tradeInCart) {
      const initialTradeInCart = [{ ...product, trade_quantity: 1 }];
      localStorage.setItem('tradeInCart', JSON.stringify(initialTradeInCart));
      setTradeQuantity(1);
    } else {
      const tradeInCartList = JSON.parse(tradeInCart);
      const existingProduct = tradeInCartList.find((item) => item.product_id === product.product_id);
      if (existingProduct) {
        existingProduct.trade_quantity += 1;
      } else {
        tradeInCartList.push({ ...product, trade_quantity: 1 });
      }
      localStorage.setItem('tradeInCart', JSON.stringify(tradeInCartList));
      setTradeQuantity((prevTradeQuantity) => prevTradeQuantity + 1);
    }

    onQuantityChange(); // Call the onQuantityChange function to notify the parent component
  };

  return (
    <div>
      <button onClick={addToTradeInCart} className=" btn bg-accent border-none text-dark
    hover:bg-yellow-400 drop-shadow-lg
    transition duration-500 ease-in-out transform font-mainfont  hover:scale-105
     font mainfont font-bold md:text-lg
     hover:animate-pulse text-md">
        Trade In
      </button>
    </div>
  );
}
