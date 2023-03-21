import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import React from "react";




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
  const productNameRef = useRef();
  const productNameToUpdateRef = useRef();
  const productIDRef = useRef();
  const productIDToUpdateRef = useRef();
  const productIDToDeleteRef = useRef();



  const [products, setProducts] = useState([]);

  const [update, setUpdated] = useState([false]);
  const [updatedError, setUpdatedError] = useState([false]);
  const [created, setCreated] = useState([false]);
  const [deleted, setDeleted] = useState([false]);
  const [deletedError, setDeletedError] = useState([false]);

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

  async function addProduct() {}



  async function updateProduct() {}

  async function deleteProduct(id) {}

  useEffect(() => {
    getProducts();
  }, []);



 

  return (
<> {" "}
<Head>
<title>Products</title>


</Head>

<main >
<section className="container bg-primary mx-auto min-h-screen">
  
<h1 className="text-8xl flex text-tertiary justify-center font-mainfont">My Products</h1>
<div>
{products.map((product) => {

  return (
    
    <div key={product.product_id} className='text-primary'>

<div className="flex flex-col w-full lg:flex-row">
<div className="card w-96 glass">
  <figure><img src={"https://raw.githubusercontent.com/cbarnett358/levelUP-Images/main/levelup-game-covers/" + product.product_id + ".png"} alt="car!"/></figure>
  <div className="card-body">
    <h2 className="card-title">{product.product_name} <div className="badge badge-secondary">${product.product_price}</div></h2>
    
    <p className="text-tertiary">
   
    <ProductRating rating={product.product_rating} />
    </p>
    <p>Trade In Value: ${product.product_tradeval}</p>
    <div className="card-actions">
    
    <div className="badge badge-outline">Fashion</div> 
      <div className="badge badge-outline">Products</div>
    </div> <button className="btn btn-primary bg-secondary border-none">Learn now!</button>
  </div>
</div>
 
</div>

</div>
  );
})}
</div>


</ section>
</main>



</>
  )
}

  



