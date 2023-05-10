//display the cart items and the tradeInCart items

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';


export default function CartPage() {
    const [cart, setCart] = useState([]);
    const [tradeInCart, setTradeInCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [tradeInTotal, setTradeInTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    
    useEffect(() => {
        const cart = localStorage.getItem('cart');
        const tradeInCart = localStorage.getItem('tradeInCart');
        if (cart) {
        setCart(JSON.parse(cart));
        }
        if (tradeInCart) {
        setTradeInCart(JSON.parse(tradeInCart));
        }
        setLoading(false);
    }, []);
    
    useEffect(() => {
        let total = 0;
        cart.forEach((product) => {
        total += product.product_price * product.product_quantity;
        });
        setTotal(total);
    }, [cart]);
    
    useEffect(() => {
        let total = 0;
        tradeInCart.forEach((product) => {
        total += product.product_price * product.trade_quantity;
        });
        setTradeInTotal(total);
    }, [tradeInCart]);
    
    const handleQuantityChange = () => {
        const cart = localStorage.getItem('cart');
        if (cart) {
        setCart(JSON.parse(cart));
        }
    };
    
    const handleTradeInQuantityChange = () => {
        const tradeInCart = localStorage.getproduct('tradeInCart');
        if (tradeInCart) {
        setTradeInCart(JSON.parse(tradeInCart));
        }
    };
    
    const handleCheckout = () => {
        const cart = localStorage.getItem('cart');
        const tradeInCart = localStorage.getItem('tradeInCart');
        if (cart && tradeInCart) {
        localStorage.removeItem('cart');
        localStorage.removeItem('tradeInCart');
        router.push('/checkout');
        }
    };
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    return (
        <div className="container">
        <h1>Cart</h1>
        <div className="row">
            <div className="col-sm-6">
            <h2>Products</h2>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                </tr>
                </
                thead>
                <tbody>
                {cart.map((product) => (
                    <tr key={product.product_id}>
                    <td>{product.product_name}</td>
                    <td>${product.product_price}</td>
                    <td>
                        <input
                        type="number"
                        value={product.quantity}
                        onChange={handleQuantityChange}
                        />
                    </td>
                    <td>${product.product_price * product.quantity}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <h3>Total: ${total}</h3>
            </div>
            <div className="col-sm-6">
            <h2>Trade-Ins</h2>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                </tr>
                </thead>
                <tbody>

                {tradeInCart.map((product) => (
                    <tr key={product.product_id}>
                    <td>{product.product_name}</td>
                    <td>${product.product_price}</td>
                    <td>
                        <input
                        type="number"
                        value={product.trade_quantity}
                        onChange={handleTradeInQuantityChange}
                        />
                    </td>
                    <td>${product.product_price * product.trade_quantity}</td>


                  

                    </tr>
                ))}
                </tbody>
            </table>
                    
       //get the total of the trade in cart
            <h3>Total: ${tradeInTotal}</h3>

            </div>
        </div>
        <button className="btn btn-primary" onClick={handleCheckout}>
            Checkout
        </button>
        </div>
    );
}

