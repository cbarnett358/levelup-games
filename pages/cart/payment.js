import React, { useState } from "react";
import Link from "next/link";

export default function Payment() {
  const [formValues, setFormValues] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolder: "",
    address: "",
    city: "",
    state: "",
    postalCode: ""
  });

  const [isFormValid, setIsFormValid] = useState(true);

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formValues.cardNumber === "" ||
      formValues.expiryDate === "" ||
      formValues.cvv === "" ||
      formValues.cardHolder === "" ||
      formValues.address === "" ||
      formValues.city === "" ||
      formValues.state === "" ||
      formValues.postalCode === ""
    ) {
      setIsFormValid(false);
    } else {
      // Form submission logic goes here
    }
  };

    return (
        <main className="bg-white min-h-screen">
        
          <div className="text-sm breadcrumbs bg-primary container ">
            <ul className="drop-shadow-xl xl:container mx-auto px-8 sm:px-8 md-px-0 text-light font-mainfont ">
              <li>
                <Link href="/">
                  <span className="material-icons">home</span>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/cart">
                  <span className="material-icons">shopping_bag</span>
                  Shopping Bag
                </Link>
              </li>
                <li>    
              
                    <span className="material-icons">payment</span>
                    Payment
              
                </li>
            </ul>
          </div>
          <div className=" mx-auto px-8 sm:px-8 md-px-0">
          <section className="xl:container mx-auto mt-10 px-8 sm:px-8 md-px-0 bg-white rounded-box border border-light
          ">
     
  <h1 className="font-mainfont font-bold text-secondary text-5xl mx-2">Payment</h1>
  <form onSubmit={handleSubmit}>
    <div className="form-control">
      <label className="label">
        <span className="label-text font-mainfont text-dark text-md md:text-lg mt-2">Card Number</span>
      </label>
      <input
        type="text"
        id="cardNumber"
        className="input input-bordered bg-light"
        placeholder="Enter your card number"
        value={formValues.cardNumber}
        onChange={handleInputChange}
      />
    </div>
    <div className="flex flex-wrap gap-4 mt-4 sm:flex-row md:flex-no-wrap">
      <div className="form-control   flex-grow">
        <label className="label">
          <span className="label-text font-mainfont text-dark text-md md:text-lg mt-2">Expiry Date</span>
        </label>
        <input
          type="text"
          id="expiryDate"
          className="input input-bordered bg-light"
          placeholder="Enter your card expiry date"
          value={formValues.expiryDate}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-control   flex-grow">
        <label className="label">
          <span className="label-text font-mainfont text-dark text-md md:text-lg mt-2">CVV</span>
        </label>
        <input
          type="text"
          id="cvv"
          className="input input-bordered bg-light"
          placeholder="Enter your card cvv"
          value={formValues.cvv}
          onChange={handleInputChange}
        />
      </div>
    </div>
    <div className="form-control">
      <label className="label">
        <span className="label-text font-mainfont text-dark text-md md:text-lg mt-2">Card Holder</span>
      </label>
      <input
        type="text"
        id="cardHolder"
        className="input input-bordered bg-light"
        placeholder="Enter your card holder name"
        value={formValues.cardHolder}
        onChange={handleInputChange}
      />
    </div>

    <div className="form-control">
      <label className="label">
        <span className="label-text font-mainfont text-dark text-md md:text-lg mt-2">Address</span>
      </label>
      <input
        type="text"
        id="address"
        className="input input-bordered bg-light"
        placeholder="Enter your address"
        value={formValues.address}
        onChange={handleInputChange}
      />
    </div>    <div className="flex flex-wrap gap-4 mt-4 sm:flex-row md:flex-no-wrap">

    <div className="form-control flex-grow">
      <label className="label">
        <span className="label-text font-mainfont text-dark text-md md:text-lg mt-2">City</span>
      </label>
      <input
        type="text"
        id="city"
        className="input input-bordered bg-light"
        placeholder="Enter your city"
        value={formValues.city}
        onChange={handleInputChange}
      />
    </div>
    <div className="form-control  flex-grow">
      <label className="label">
        <span className="label-text font-mainfont text-dark text-md md:text-lg mt-2">State</span>
      </label>
      <input
        type="text"
        id="state"
        className="input input-bordered bg-light"
        placeholder="Enter your state"
        value={formValues.state}
        onChange={handleInputChange}
      />
    </div>
    <div className="form-control  flex-grow">
      <label className="label">
        <span className="label-text font-mainfont text-dark text-md md:text-lg mt-2">Postal Code</span>
      </label>
      <input
        type="text"
        id="postalCode"
        className="input input-bordered bg-light"
        placeholder="Enter your postal code"
        value={formValues.postalCode}
        onChange={handleInputChange}
      />
    </div></div>
    <Link href="../cart/confirmed">
      <div className="form-control my-6">
        <button className=" btn bg-secondary border-none text-light
    hover:bg-pink-500 drop-shadow-lg
    transition duration-500 ease-in-out transform font-mainfont  hover:scale-105 hover:animate-pulse
     font mainfont font-bold text-lg
">Confirm Purchase</button>
      </div>
    </Link>
  </form>

</section>
</div>
</main>
    )
}


