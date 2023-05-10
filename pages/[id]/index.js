import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NavBar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductRating } from '..';
import Link from 'next/link';
import AddToCartBtn from '@/components/AddToCartBtn';
import TradeInCartButton from '@/components/TradeInBtn';
export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [tradeInQuantity, setTradeInQuantity] = useState(0);

  const router = useRouter();

  useEffect(() => {
    async function getProduct() {
      const { id } = router.query;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}../../api/products`);
      const { products } = await res.json();
      const matchedProduct = products.find((product) => product.product_id === Number(id));
      setProduct(matchedProduct);
      setLoading(false);
    }

    getProduct();
  }, [router.query.id]);

  useEffect(() => {
    const cart = localStorage.getItem('cart');
    if (cart) {
      const cartList = JSON.parse(cart);
      let quantity = 0;
      cartList.forEach((item) => {
        quantity += item.quantity;
      });
      setCartQuantity(quantity);
    }
  }, []);

  const handleQuantityChange = () => {
    const cart = localStorage.getItem('cart');
    if (cart) {
      const cartList = JSON.parse(cart);
      let quantity = 0;
      cartList.forEach((item) => {
        quantity += item.quantity;
      });
      setCartQuantity(quantity);
    }
  };

  useEffect(() => {
    const tradeInCart = localStorage.getItem('tradeInCart');
    if (tradeInCart) {
      const tradeInCartList = JSON.parse(tradeInCart);
      let quantity = 0;
      tradeInCartList.forEach((item) => {
        quantity += item.trade_quantity;
      });
      setTradeInQuantity(quantity);
    }
  }, []);

  const handleTradeInQuantityChange = () => {
    const tradeInCart = localStorage.getItem('tradeInCart');
    if (tradeInCart) {
      const tradeInCartList = JSON.parse(tradeInCart);
      let quantity = 0;
      tradeInCartList.forEach((item) => {
        quantity += item.trade_quantity;
      });
      setTradeInQuantity(quantity);
    }
  };


  if (loading || !product) {
    return (
      <div className='flex items-center justify-center h-screen bg-light text-dark font-mainfont'>
        Loading...
      </div>
    );
  }

  

  return (
    <main className='bg-light'>                   <NavBar quantity={cartQuantity} tradeQuantity={tradeInQuantity} />





      <div className=" xl:container  
    mx-auto 
    min-h-screen 
    ">
      <div className="  breadcrumbs mx-5 font-mainfont text-dark text-lg">
  <ul>
    <li>
     <Link href="/">

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
        Home
      </Link>
    </li> 
    <li>
    
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
        {product.product_name}
     
    </li> 
  
  </ul>
  
</div>
      <div className="hero  ">
        
  <div className="hero-content flex-col lg:flex-row px-8 sm:px-8 md-px-0">
  <img
  src={product.product_id ? `https://res.cloudinary.com/dabmn9eje/image/upload/v1683582484/${product.product_id}.png` : "https://placehold.co/600x400"}
  alt="Game Cover"
  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x600/6C30BF/FFFF/?text=Product Cover"; }}
/>
    <div>
    <div className="badge badge-outline text-dark">{product.product_platform}</div>
      <h1 className="text-secondary text-5xl font-bold font-mainfont">{product.product_name}</h1>
      <div className="text-accent text-tertiary ">
      <ProductRating rating={product.product_rating} />
      </div>
      <p className="font-mainfontpy-6 text-dark">{product.product_description}</p>
      <p className=''>
        ${product.product_price}
      </p>
      <p>
        ${product.product_tradeval}
      </p>
      <TradeInCartButton
        product={product}
        onQuantityChange={handleTradeInQuantityChange} // Pass the correct function here
      />   <AddToCartBtn product={product} onQuantityChange={handleQuantityChange} />

    <div className="flex flex-row space-x-2">
  

      </div>
    </div>
  </div>
</div></div>


        
<Footer></Footer>

    </main>
  );
}
