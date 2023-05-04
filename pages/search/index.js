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
        <div>
          <NavBar />
          <Hero />
          <TradeSteps />
          <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
   
              <h1 className="text-6xl font-bold">Search Results</h1>
              <p className="mt-3 text-2xl">
                {searchResults.length} results for {search}
              </p>
              <div className="flex flex-wrap justify-around max-w-4xl mt-6 sm:w-full">
                {searchResults.map((product) => (
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
                ))}
                </div>
            </main>
            </div>
            <Footer />
        </div>
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




