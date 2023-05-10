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
        <main className="bg-white">
          <div className="text-sm breadcrumbs bg-primary container">
            <ul className="drop-shadow-xl xl:container mx-auto px-8 sm:px-8 md-px-0 text-light font-mainfont">
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
            </ul>
          </div>
          <section className="xl:container mx-auto mt-10 px-8 sm:px-8 md-px-0 bg-light py-12 
          rounded-box drop-shadow-xl
          ">
            <div className="flex flex-col w-full">
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Card Number</span>
                        </label>
                        <input

                            type="text"
                            id="cardNumber"
                            className="input input-bordered"
                            placeholder="Enter your card number"
                            value={formValues.cardNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-control">

                        <label className="label">
                            <span className="label-text">Expiry Date</span>
                        </label>
                        <input

                            type="text"
                            id="expiryDate"
                            className="input input-bordered"
                            placeholder="Enter your card expiry date"
                            value={formValues.expiryDate}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-control">

                        <label className="label">

                            <span className="label-text">CVV</span>
                        </label>
                        <input

                            type="text"
                            id="cvv"
                            className="input input-bordered"
                            placeholder="Enter your card cvv"
                            value={formValues.cvv}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-control">

                        <label className="label">
                            <span className="label-text">Card Holder</span>
                        </label>
                        <input

                            type="text"
                            id="cardHolder"
                            className="input input-bordered"
                            placeholder="Enter your card holder name"
                            value={formValues.cardHolder}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-control">

                        <label className="label">
                            <span className="label-text">Address</span>
                        </label>
                        <input


                            type="text"
                            id="address"
                            className="input input-bordered"
                            placeholder="Enter your address"
                            value={formValues.address}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-control">

                        <label className="label">
                            <span className="label-text">City</span>
                        </label>
                        <input


                            type="text"
                            id="city"
                            className="input input-bordered"
                            placeholder="Enter your city"
                            value={formValues.city}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-control">

                        <label className="label">
                            <span className="label-text">State</span>
                        </label>
                        <input


                            type="text"
                            id="state"
                            className="input input-bordered"
                            placeholder="Enter your state"
                            value={formValues.state}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-control">

                        <label className="label">
                            <span className="label-text">Postal Code</span>
                        </label>
                        <input


                            type="text" 
                            id="postalCode"
                            className="input input-bordered"
                            placeholder="Enter your postal code"
                            value={formValues.postalCode}
                            onChange={handleInputChange}
                        />
                    </div>
                    <Link href="../cart/confirmed">
                    <div className="form-control mt-6">
                        <button className="btn btn-primary bg-secondary border-none font-mainfont text-light">Pay Now</button>

                    </div>
                    </Link>
                </form>
            </div>
        </section>
    </main>
    );
}
