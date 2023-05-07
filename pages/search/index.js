//make this a page to show search results from the database and make a reusable component for the search bar

import React from 'react'
import { Hero } from '@/components/Hero'
import TradeSteps from '@/components/Tradesteps'
import { NavBar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import { query } from '@/lib/db'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

import { limitProductTitle } from '..'
import { ProductRating } from '..'






export default function Search({ products }) {
    const router = useRouter()
    const { search } = router.query
    const [searchResults, setSearchResults] = useState([])
    
    useEffect(() => {
        if (search) {
        const results = products.filter((product) =>
            product.product_name.toLowerCase().includes(search.toLowerCase())
        )
        setSearchResults(results)
        }
    }, [search, products])





    
    return (
      <main className="min-h-screen">

          <NavBar />
          <Hero />
          <TradeSteps />
          <div className="mx-auto xl:container">
          <h2 className="text-4xl font-mainfont font-bold  text-secondary pt-10  ">Search Results</h2>

              <p className="text-xl  font-mainfont pb-2 -mt-2 text-dark">
                {searchResults.length} results for {search}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8 ">
              {searchResults.map((product) => (
 <div  key={product.product_id}>
 <Link href={`/${product.product_id}`} className="block max-w-sm rounded-lg  shadow-lg hover:shadow-xl transition-shadow duration-200 
 ease-out">


<div className="card w-auto bg-light shadow-xl 
hover:scale-105 transition duration-500 ease-in-out  hover:shadow-xl 
">
<figure>
<img src={"https://raw.githubusercontent.com/cbarnett358/levelUP-Images/main/levelup-game-covers/" + product.product_id + ".png"} alt="Shoes" />

</figure>
<div className="card-body p-4">      
<div className="badge badge-outline font-mainfont font dark font-bold ">{product.product_platform}</div>


<h2 className="card-title font-mainfont text-2xl  font-bold text-secondary">  {limitProductTitle(product.product_name)}</h2>

<div className="text-xs text-tertiary ">
<ProductRating rating={product.product_rating} />
</div>
<h3 className="mb-2 font-mainfont text-lg font-bold" >
${product.product_price}
<div className=" ml-2 badge badge-secondary font-mainfont text-lg">Trade In: ${product.product_tradeval}</div>
</h3>


</div>
</div>     </Link>         

</div>
                ))}
                </div>
    
            </div>
            <Footer />
            </main>
            )
}


export async function getServerSideProps() {
    const products = await query({
        query: `
        SELECT * FROM products
        `,
        values: null,
    })
    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
        },
    }
}




