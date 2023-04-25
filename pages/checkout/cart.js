import React from 'react';
import { useEffect, useState } from 'react';
import 'material-icons/iconfont/material-icons.css';
import Link from 'next/link';


export function deleteCart() {
    localStorage.removeItem('cart');
    window.location.reload();
}

export function decreaseQuantity(product_id) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productExists = cart.find((p) => p.product_id === product_id);
    if (productExists) {
        productExists.quantity--;
        productExists.price--;
    }
    if (productExists.quantity === 0) {
        const index = cart.indexOf(productExists);
        cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();

}

export function decreaseTradeQuantity(product_id) {
    const tradecart = JSON.parse(localStorage.getItem("tradecart")) || [];
    const productExists = tradecart.find((p) => p.product_id === product_id);
    if (productExists) {
        productExists.quantity--;
        productExists.tradeval--;
    }
    if (productExists.quantity === 0) {
        const index = tradecart.indexOf(productExists);
        tradecart.splice(index, 1);
    }
    localStorage.setItem("tradecart", JSON.stringify(tradecart));
    window.location.reload();

}


//increase quantity of trade in cart and refresh page
export function increaseTradeQuantity(product_id) {
    const tradecart = JSON.parse(localStorage.getItem("tradecart")) || [];
    const productExists = tradecart.find((p) => p.product_id === product_id);
    if (productExists) {
        productExists.quantity++;
        productExists.tradeval++;
    }
    localStorage.setItem("tradecart", JSON.stringify(tradecart));

    window.location.reload();
}


export function increaseQuantity(product_id) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productExists = cart.find((p) => p.product_id === product_id);
    if (productExists) {
        productExists.quantity++;
        productExists.price++;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();
}

//final total is total - tradetotal and if negative show + instead of -
function finalTotal() {
    let finaltotal = total - tradetotal;
    if (finaltotal < 0) {
        return <h1 className='text-red'>+${finaltotal * -1}</h1>
    } else {
        return <h1 className='text-red'>-${finaltotal}</h1>
    }
}



export function deleteTradeCart() {
    localStorage.removeItem('tradecart');
    window.location.reload();
}

//get cart and tradecart from local storage and return them and get the total price of the cart and tradecart then subtract tradeval
export function getCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const tradecart = JSON.parse(localStorage.getItem("tradecart")) || [];
    let total = 0;
    cart.map((product) => {
        total += product.product_price * product.quantity;
    })

    let tradetotal = 0;
    tradecart.map((product) => {
        tradetotal += product.product_tradeval * product.quantity;
    })

    let finaltotal = total - tradetotal;
    return { cart, tradecart, total, tradetotal, finaltotal };
}

export default function AddToCart() {

    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [tradecart, setTradeCart] = useState([]);
    const [tradetotal, setTradeTotal] = useState(0);

    

    useEffect(() => {

        const cart = localStorage.getItem('cart');
        if (cart) {
            let cartList = JSON.parse(cart);
            let totalVal = 0;
            cartList.map((product) => {
                totalVal += product.product_price * product.quantity;
            })

            console.log('test', totalVal);
            setTotal(totalVal);
            setCart(JSON.parse(cart));
        }


        const tradecart = localStorage.getItem('tradecart');


        if (tradecart) {
            let tradecartList = JSON.parse(tradecart);
            let tradetotalVal = 0;
            tradecartList.map((product) => {
                //when the user has two of the same product in their cart, the total price of the product is the price of the product times the quantity of the product
                tradetotalVal += product.product_tradeval * product.quantity;
            })
            setTradeTotal(tradetotalVal);
            setTradeCart(JSON.parse(tradecart));
        }

    }, []);

    return (
        <main className='bg-white
        min-h-screen
        '>
     
        <div className="text-sm breadcrumbs bg-primary text-light ">
  <ul className='mx-6'>
    <li>
    <Link href="/">
<span className="material-icons">home</span>
        Home
   </Link>
    </li> 
    <li>
      <a>
        <span className="material-icons">shopping_bag</span>
        Order Summary
      </a>
    </li> 
  
  </ul>

</div>


  <div className="hero-content flex-col-reverse lg:flex-row-reverse h-screen py-40 bg-light ">
    

  <div className=" card flex-shrink-0 w-full max-w-sm shadow-2xl bg-white -mt-10">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          
          <input type="text" placeholder="email" className="bg-light input input-bordered" />
        </div>
        <div className="form-control ">
         
         
            <label className="label">
            <span className="label-text">Card Number</span>
            </label>
            <input type="text" placeholder="password" className="bg-light input input-bordered" />
<label className="label">
            <span className="label-text">Name On Card</span>
            </label>
            

            <label className="label">
            <span className="label-text">Expiration Date</span>
            </label>
            <input type="text" placeholder="password" className="bg-light input input-bordered" />

            <label className="label">
            <span className="label-text">CVV</span>
            </label>
            <input type="text" placeholder="password" className="bg-light input input-bordered" />

            <label className="label">
            <span className="label-text">Billing Address</span>
            </label>

        </div>
        <div className="form-control mt-6">
        <Link href="/checkout/confirmation"> <button className="btn btn-secondary font mainfont text-md">Proceed To Payment</button></Link>
         
        </div>
      </div>
    </div>
    
    <div className="text-center lg:text-left">
        
      <h1 className="text-6xl font-bold text-secondary font-mainfont">Shopping Cart</h1>
   
   <h2>Purchases:</h2>
      <div className="overflow-x-auto ">
   
      <div className=' drop-shadow-2xl pb-2
                   rounded-lg bg-white
                   '>
  {cart.map((product) => {
            return (
                <div key={product.product_id}>
                  
    <table className="table w-full">
     
        <tbody>
            <tr>
                <td className='bg-transparent   w-full '>
                    <div className="flex items-center">
                        <div className="w-12 h-8 mr-3 ">
                            <img 
                            className='rounded-lg'
                            src={"https://raw.githubusercontent.com/cbarnett358/levelUP-Images/main/levelup-game-covers/" + product.product_id + ".png"} />
                        </div>
                        <div>
                            <p className="font-semibold">{product.product_name}</p>
                        </div>
                    </div>
                </td>
                <td className='bg-transparent    w-full'>
                    <div className="flex items-center ">
                        <button className="btn btn-ghost btn-xs"  onClick={() => decreaseQuantity(product.product_id)}>-</button>
                        <span className="mx-2">{product.quantity}</span>
                        <button className="btn btn-ghost btn-xs"
                        onClick={() => increaseQuantity(product.product_id)}
                        >+</button>
                    </div>
                </td>
                <td className='bg-transparent  w-full'>
             <span className="text-sm font-semibold">$
                {(product.product_price * product.quantity).toFixed(2)}</span>
                </td>

               
            </tr>


               </tbody>
</table>
</div>
                );
            })}

</div>

</div>

<div>
    Total: ${total.toFixed(2)} 
    <button 
className='btn btn-ghost btn-xs'
onClick={deleteCart}
>Clear Cart</button>


</div>

<h2 className='pt-8'>Trade Credit:</h2>
<div className=' drop-shadow-2xl pb-2
                     rounded-lg bg-white
                        '>
    {tradecart.map((product) => {
                return (
                    <div key={product.product_id}>

 <table className="table w-full">
     
        <tbody>
            <tr>
                <td className='bg-transparent   w-full '>
                    <div className="flex items-center">
                        <div className="w-12 h-8 mr-3 ">
                            <img
                            className='rounded-lg'
                            src={"https://raw.githubusercontent.com/cbarnett358/levelUP-Images/main/levelup-game-covers/" + product.product_id + ".png"} />
                        </div>
                        <div>
                            <p className="font-semibold">{product.product_name}</p>
                        </div>
                    </div>
                </td>
                <td className='bg-transparent    w-full'>
                    <div className="flex items-center ">
                        <button className="btn btn-ghost btn-xs"
                         onClick={() => decreaseTradeQuantity(product.product_id)}
                        >-</button>
                        <span className="mx-2">{product.quantity}</span>
                        <button className="btn btn-ghost btn-xs"
                        onClick={() => increaseTradeQuantity(product.product_id)}
                        >+</button>
                    </div>
                </td>
                <td className='bg-transparent  w-full'>
             <span className="text-sm font-semibold">
             <p>${product.product_tradeval * product.quantity.toFixed(2) }</p>

             
             </span>
                </td>

            </tr>
        
               </tbody>
               
</table>

</div>

                    );
                })}

</div>

<div>
    Total: ${tradetotal.toFixed(2)}

    <button 
className='btn btn-ghost btn-xs'
onClick={deleteTradeCart}
>Clear Trade-Ins</button>

</div>
<div className='pt-4 font-mainfont text-4xl'>Final total: ${(total - tradetotal).toFixed(2)}</div>



                        <div>

           
</div>    </div>
   
  </div>

        </main>
    )
}


    
