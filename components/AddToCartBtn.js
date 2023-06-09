import React, { useState, useEffect } from 'react';

export function QuantityDisplay({ quantity }) {
  const displayQuantity = isNaN(quantity) ? 0 : quantity;
  return <span>{displayQuantity}</span>;
}


export default function AddToCartBtn({ product, onQuantityChange }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const cart = localStorage.getItem('cart');
    if (cart) {
      const cartList = JSON.parse(cart);
      let totalVal = 0;
      let quantityVal = 0;
      cartList.forEach((product) => {
        totalVal += product.product_price * product.quantity;
        quantityVal += product.quantity;
      });
      setTotal(totalVal);
      setQuantity(quantityVal);
      setCart(cartList);
    }
  }, []);

  const addToCart = (product) => {
    const cart = localStorage.getItem('cart');
    if (!cart) {
      localStorage.setItem('cart', JSON.stringify([{ ...product, quantity: 1 }]));
      setCart([{ ...product, quantity: 1 }]);
      setTotal(product.product_price);
      setQuantity(1);
    } else {
      const cartList = JSON.parse(cart);
      const existingProduct = cartList.find((item) => item.product_id === product.product_id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cartList.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(cartList));
      setCart(cartList);
      setTotal((prevTotal) => prevTotal + product.product_price);
      setQuantity((prevQuantity) => prevQuantity + 1);
    }

    onQuantityChange(); // Call the onQuantityChange function to notify the parent component
  };

  return (
    <div>
      <button onClick={() => addToCart(product)} className="btn bg-secondary border-none text-light
    hover:bg-pink-500 drop-shadow-lg
    transition duration-500 ease-in-out transform font-mainfont  hover:scale-105
     font mainfont font-bold text-md md:text-lg hover:animate-pulse

">
        Add to Cart
      </button>
   
    </div>
  );
}
