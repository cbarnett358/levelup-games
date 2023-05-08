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
      return productName.substring(0, 30) + "...";
  }
  return productName;
}


// pagination function
export function ProductPagination({ products }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [sortCategory, setSortCategory] = useState(""); // Track the selected sorting category
  const [sortDirection, setSortDirection] = useState("asc"); // Track the sorting direction (asc or desc)

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSortChange = (event) => {
    const selectedCategory = event.target.value;
    setSortCategory(selectedCategory);
  };

  const handleSortDirectionChange = (event) => {
    const selectedDirection = event.target.value;
    setSortDirection(selectedDirection);
  };

  // Helper function to sort products based on category and direction
  const sortProducts = (category, direction) => {
    const sorted = [...products];

    if (category === "") {
      return sorted;
    }

    sorted.sort((a, b) => {
      const valueA = a[category];
      const valueB = b[category];

      if (category === "product_platform") {
        // Sort alphabetically for platform category
        if (direction === "asc") {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      } else {
        // Sort numerically for other categories
        if (direction === "asc") {
          return valueA - valueB;
        } else {
          return valueB - valueA;
        }
      }
    });

    return sorted;
  };

  const resetSort = () => {
    setSortCategory("");
    setSortDirection("asc");
  };

  const sortedProducts = sortProducts(sortCategory, sortDirection);
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);


  return (
    <div
    className="
    xl:container  
    mx-auto 
    "
    >
      <div 
     className="
      flex flex-col
      

      
     " 
      >

   


      <h2 className="text-4xl font-mainfont font-bold  text-secondary pt-10 ">Shop Games</h2>   {/* Sort controls */}
      <div className="flex justify-between items-center mb-4 pb-2">
        <div className="dropdown">
          <label htmlFor="sortCategory" className="mr-2 font-mainfont text-dark">Sort By:</label>
          <select
            id="sortCategory"
            value={sortCategory}
            onChange={handleSortChange}
            className="dropdown-select bg-light rounded-md font-mainfont text-dark"
          >
            <option value="">None</option>
            <option value="product_price">Price</option>
            <option value="product_platform">Platform</option>
            <option value="product_tradeval">Trade In</option>
            <option value="product_rating">Rating</option>
          </select>
        </div>
        {sortCategory && (
          <div className="dropdown">
            <label htmlFor="sortDirection" className="mr-2">Sort direction:</label>
            <select
              id="sortDirection"
              value={sortDirection}
              onChange={handleSortDirectionChange}
              className="dropdown-select  bg-light  rounded-md font-mainfont text-dark Sort By:"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        )}
        <button onClick={resetSort} className="btn btn-sm btn-error text-light font-mainfont
        normal-case
        ">Reset</button>
      </div></div>

    <div  className='   grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8 
    
'>
        
               {currentProducts.map((product) => (
          <div key={product.product_id}>
                      <Link href={`/${product.product_id}`} className=" max-w-sm rounded-lg  shadow-lg hover:shadow-xl transition-shadow duration-200 
                      ease-out">
                 

      <div className="card w-auto  bg-light  shadow-xl 
      
      hover:scale-105 transition duration-500 ease-in-out  hover:shadow-xl 
      ">
  <figure>
    <img src={"https://raw.githubusercontent.com/cbarnett358/levelUP-Images/main/levelup-game-covers/" + product.product_id + ".png"} alt="Game Cover" 
    
    />
    
    </figure>
  <div className="card-body p-4">      
  <div className="badge badge-outline font-mainfont font dark font-bold text-dark">{product.product_platform}</div>
  
 
    <h2 className="card-title font-mainfont text-2xl  font-bold text-secondary">  {limitProductTitle(product.product_name)}</h2>
   
    <div className="text-xs text-accent ">
      <ProductRating rating={product.product_rating} />
      </div>
    <h3 className="mb-2 font-mainfont text-lg font-bold text-dark" >
      ${product.product_price}
      <div className=" ml-2 badge badge-secondary font-mainfont  text-light text-lg">Trade In: ${product.product_tradeval}</div>
    </h3>

  
  </div>
</div>     </Link>         

                  </div>
              ))}      


</div>


<div className="flex  mt-12 gap-1 justify-center
">
  <div className="btn-group">
  <button disabled={currentPage === 1 ? true : false}
onClick={() => paginate(currentPage - 1)} className="btn bg-accent hover:bg-yellow-500 f font-mainfont text-bold text-3xl border-none">«</button>
  <button className="btn btn-disabled text-dark bg-light  font-mainfont normal-case text-md">Page: {currentPage}
</button>
  <button disabled={currentPage === Math.ceil(products.length / productsPerPage) ? true : false}
 onClick={() => paginate(currentPage + 1)}  className="btn  bg-secondary hover:bg-pink-500 font-mainfont text-bold text-3xl border-none ">»</button>
</div>

</div>
       

         
      </div>
      
  );
}
//Paginnation function end

// This function displays the rating of a product in the form of stars.
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


// Getting the products from the database
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

  
