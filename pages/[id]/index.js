import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Error from 'next/error';
import { NavBar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProductRating } from '..';


  
  

export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
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

  if (loading) {
    return <div
    className='bg-base-200
    min-h-screen'
    >Loading...</div>;
  }

  if (!product) {
    return <Error statusCode={404} />;
  }

  return (
    <main
    className='bg-base-200'
    >
      <NavBar></NavBar>
      <div className=" text-sm breadcrumbs">
  <ul>
    <li>
      <a>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
        Home
      </a>
    </li> 
    <li>
      <a>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
        Documents
      </a>
    </li> 
    <li>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
      Add Document
    </li>
  </ul>
</div>
      <div className="hero bg-base-200 mt-12">
  <div className="hero-content flex-col lg:flex-row">
    <img src={"https://raw.githubusercontent.com/cbarnett358/levelUP-Images/main/levelup-game-covers/" + product.product_id + ".png"} alt="Game Cover Art"
 className="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-secondary text-5xl font-bold font-mainfont">{product.product_name}</h1>
      <div className="text-base text-tertiary ">
      <ProductRating rating={product.product_rating} />
      </div>
      
      <p className="font-mainfontpy-6">{product.product_description}</p>
      <p className=''>
        ${product.product_price}
      </p>
      <p>
        ${product.product_tradeval}
      </p>
      
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
  
</div>
<Footer></Footer>

    </main>
  );
}
