import React, { useState } from "react";
import { useSelector } from "react-redux";

const Checkout = () => {
    const [inputData, setInputData] = useState({});
    const totalAmount = useSelector((state) => state.cart.totalAmount);

    const getValue = (e) => {
        setInputData({ ...inputData, [e.target.id]: e.target.value });
    };

    const checkOutValidtion = (e) => {
        e.preventDefault();
    };
    // console.log(inputData);
    return (
        <>
            <div className="my-4 space-1">
                <div className="row">
                    <div className="col-lg-8">
                        <div>
                            <h2 className="checkout_heading">Checkout</h2>
                        </div>
                        <form onSubmit={checkOutValidtion}>
                            <div className="checkout_form">
                                <div className="d-flex gap-4 ">
                                    <div className="form-floating w-100">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={inputData.firstName}
                                            onChange={getValue}
                                            id="firstName"
                                            placeholder="firstName"
                                        />
                                        <label htmlFor="firstName">First Name *</label>
                                    </div>
                                    <div className="form-floating w-100">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={inputData.lastName}
                                            onChange={getValue}
                                            id="lastName"
                                            placeholder="lastName"
                                        />
                                        <label htmlFor="lastName">Last Name *</label>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="form-floating w-100">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={inputData.Address}
                                            onChange={getValue}
                                            id="Address"
                                            placeholder="Address"
                                        />
                                        <label htmlFor="Address">Address *</label>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="form-floating w-100">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={inputData.Apartment}
                                            onChange={getValue}
                                            id="Apartment"
                                            placeholder="Apartment"
                                        />
                                        <label htmlFor="Apartment">Apartment, Suite, Etc (optional) *</label>
                                    </div>
                                </div>
                                <div className="d-flex gap-4 ">
                                    <div className="form-floating w-100">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={inputData.State}
                                            onChange={getValue}
                                            id="State"
                                            placeholder="State"
                                        />
                                        <label htmlFor="State">State *</label>
                                    </div>
                                    <div className="form-floating w-100">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={inputData.ZipCode}
                                            onChange={getValue}
                                            id="ZipCode"
                                            placeholder="ZipCode"
                                        />
                                        <label htmlFor="ZipCode">Zip Code *</label>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="checkout_heading">Contact Information</h2>
                                </div>
                                <div className="d-flex">
                                    <div className="form-floating w-100">
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={inputData.Email}
                                            onChange={getValue}
                                            id="Email"
                                            placeholder="Email"
                                        />
                                        <label htmlFor="Email">Email *</label>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="form-floating w-100">
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={inputData.PhoneNumber}
                                            onChange={getValue}
                                            id="PhoneNumber"
                                            placeholder="Phone Number"
                                        />
                                        <label htmlFor="PhoneNumber">Phone Number *</label>
                                    </div>
                                </div>
                                <div>
                                    <input value={"Continue to Payment"} type="submit"></input>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-4">
                        <div className="ps-lg-5">
                            <div className="checkout_totalbox">
                                <h2>Order Summary</h2>
                                <div>
                                    <div>
                                        <p>Subtotal</p>
                                    </div>
                                    <div>
                                        <span>${totalAmount.toFixed()}</span>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p>Standard Shipping</p>
                                    </div>
                                    <div>
                                        <span className="text-success fw-bold">FREE</span>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p>Tax</p>
                                    </div>
                                    <div>
                                        <span>$0.00</span>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <h3>Estimated Total</h3>
                                    </div>
                                    <div>
                                        <h3>${totalAmount.toFixed()}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;
