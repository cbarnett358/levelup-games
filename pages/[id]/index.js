import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NavBar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductRating } from '..';
import Link from 'next/link';



export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartQuantity, setCartQuantity] = useState(0); // New state for cart quantity
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
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productExists = cart.find((p) => p.product_id === product?.product_id);

    if (productExists) {
      setCartQuantity(productExists.quantity);
    } else {
      setCartQuantity(0);
    }
  }, [product]);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productExists = cart.find((p) => p.product_id === product.product_id);

    if (productExists) {
      productExists.quantity++;
      productExists.price++;
    } else {
      cart.push({ ...product, quantity: 1, price: product.product_price });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setCartQuantity(cart.reduce((total, p) => total + p.quantity, 0));
  };

  const tradeInCart = (product) => {
    const tradecart = JSON.parse(localStorage.getItem('tradecart')) || [];
    const productExists = tradecart.find((p) => p.product_id === product.product_id);

    if (productExists) {
      productExists.quantity++;
      productExists.tradeval++;
    } else {
      tradecart.push({ ...product, quantity: 1, tradeval: product.product_tradeval });
    }

    localStorage.setItem('tradecart', JSON.stringify(tradecart));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <main
    className='bg-light 
    '
    >
      <NavBar></NavBar>            

      <div className=" xl:container  
    mx-auto 
    min-h-screen
    ">
      <div className="  breadcrumbs mx-5 font-mainfont text-dark text-lg ">
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
  {cartQuantity}
  
</div>
      <div className="hero  ">
        
  <div className="hero-content flex-col lg:flex-row">
    
    <img src={"https://raw.githubusercontent.com/cbarnett358/levelUP-Images/main/levelup-game-covers/" + product.product_id + ".png"} alt="Game Cover Art"
 className="max-w-sm rounded-lg shadow-2xl" />
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
     
    <div className="flex flex-row space-x-2">
      <button
        className="btn border-none bg-secondary btn-md font-bold font-mainfont  text-light text-lg"
        onClick={() => addToCart(product)}
      >
        Add To Cart
      </button>
      <button

        className="btn border-none bg-accent btn-md font-bold font-mainfont text-dark  text-lg"
        onClick={() => tradeInCart(product)}
      >

        Trade In
      </button>
      </div>
    </div>
  </div>
</div></div>


        
<Footer></Footer>

    </main>
  );
}
