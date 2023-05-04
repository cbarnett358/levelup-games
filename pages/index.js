import { useEffect, useState } from "react";
import Head from "next/head";
import React from "react";
import { Hero } from "@/components/Hero";
import TradeSteps from "@/components/Tradesteps";
import { NavBar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";




// This function limits the length of a product title to at most 35 characters.
// If the title is longer than 35 characters, the function adds an ellipsis at the end of the title.
export function limitProductTitle(productName) {
  if (productName.length > 35) {
      return productName.substring(0, 25) + "...";
  }
  return productName;
}



export function tradeInCart(product) {
  window.location.reload(true);

  const tradecart = JSON.parse(localStorage.getItem("tradecart")) || [];
  const productExists = tradecart.find((p) => p.product_id === product.product_id);
  if (productExists) {

      productExists.quantity++;
      productExists.tradeval++;

  } else {

      tradecart.push({ ...product, quantity: 1, tradeval: product.product_tradeval });
  }
  localStorage.setItem("tradecart", JSON.stringify(tradecart));
}


//adds to cart and refreshes page to update cart
export function addToCart(product) {
  console.log('hey',product);

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    //REFRESH THE CART

    window.location.reload(true);

    const productExists = cart.find((p) => p.product_id === product.product_id);
    if (productExists) {
        productExists.quantity++;
        productExists.price++;
        
    } else {
        cart.push({ ...product, quantity: 1, price: product.product_price });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
}

//pagination function
export function ProductPagination({ products }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div
    className="
    xl:container  
    mx-auto
    "
    >
      <h2 className="text-4xl font-mainfont font-bold  text-secondary pt-10 pb-2">Shop Games</h2>

    <div  className='   grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-10
    
'>
        
              {currentProducts.map((product) => (
                  <div  key={product.product_id}>
                    
<div
    className="block max-w-sm mt-sm rounded-lg bg-light shadow-lg ">

    <Link href={`/${product.product_id}`} className="block max-w-sm rounded-lg bg-light shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out">
    
   
    <img className="rounded-t-lg" src={"https://raw.githubusercontent.com/cbarnett358/levelUP-Images/main/levelup-game-covers/" + product.product_id + ".png"} alt="Game Cover Art"/>

      
    </Link>
    <div className="p-6">
   
      <h5
        className="mb-2 font-mainfont text-2xl  font-bold leading-tight text-pink-600 
        
        ">
        {limitProductTitle(product.product_name)}
      </h5>
      <div className="text-base text-tertiary ">
      <ProductRating rating={product.product_rating} />
      </div>
      <p className="text-xl mb-2 font-mainfont text-dark">
      ${product.product_price}
      </p>

  

      <p className="mb-2 font-mainfont text-dark text-lg ">
      Platform: {product.product_platform}
      </p>



    <p className="mb-2 font-mainfont text-dark text-lg ">
      Trade In Value: ${product.product_tradeval}
      </p>

        
      <div className="space-x-3">
        
      <button
        key={product.product_id}
        onClick={() => addToCart(product)}

        

        type="button"
        className="font-mainfont mt-4 inline-block rounded bg-secondary text-light px-4 py-2 text-lg font-bold
        shadow-md  hover:bg-pink-500 hover:text-xl
        "
        data-te-ripple-init


          

        data-te-ripple-color="light">    
        Add to Cart
      </button>
   
     <button
        type="button"
        className="font-mainfont inline-block rounded bg-tertiary text-dark px-4 py-2 text-lg font-bold
        hover:bg-yellow-400 shadow-md hover:text-xl
        "
        data-te-ripple-init
        onClick={() => tradeInCart(product)}

        data-te-ripple-color="light">
        Trade In
      </button>
   
      </div>
<div>
  
      </div>
      
    </div>
  </div>
                  </div>
              ))}      


</div>


<div className="flex  mt-12 gap-1
">
<button
disabled={currentPage === 1 ? true : false}
onClick={() => paginate(currentPage - 1)}
className="bg-tertiary hover:bg-pink-500 text-dark font-bold py-2 px-4 rounded"

>  

Prev 
</button>


<button 
disabled={currentPage === Math.ceil(products.length / productsPerPage) ? true : false}
 onClick={() => paginate(currentPage + 1)} 
className="bg-secondary hover:bg-pink-500 text-light font-bold py-2 px-4 rounded">
Next
</button>
</div>
       

         
      </div>
      
  );
}



export function ProductRating({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
      
      if (i <= rating) {
          stars.push(<i key={i} className="material-icons">star</i>);
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
          stars.push(<i key={i} className="material-icons">star_half</i>);
      } else {
          stars.push(<i key={i} className="material-icons">star_border</i>);
      }
  }
  return <div>{stars}</div>;
}

export default function Home() {




  const [products, setProducts] = useState([]);


  async function getProducts() {
    const postData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch

    (`${process.env.NEXT_PUBLIC_API_URL}../../api/products`, 
    postData);




  const response = await res.json();
  console.log(response.products);
  setProducts(response.products);
 

    




}




  useEffect(() => {
    getProducts();
  }, []);


  



 

  return (
<> {" "}
<Head>
<title>levelUP Retro Video Game Exchange</title>


</Head>

<main className="bg-white">
  <NavBar></NavBar>
<Hero></Hero>
  <TradeSteps></TradeSteps>
<section className="container  mx-20 ">
 





<ProductPagination products={products} />








</ section>

<Footer></Footer>
</main>



</>
  )
}

  
