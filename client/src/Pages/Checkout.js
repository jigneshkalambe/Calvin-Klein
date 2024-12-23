import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Scrollbtn from "../Components/ScrollBtn";
import axios from "axios";
import Pdf from "../Components/Pdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Swal from "sweetalert2";
import { cartAction } from "../Store/Slice/CartSlice";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const [generatePDF, setGeneratePDF] = useState(false);
    const [inputData, setInputData] = useState({
        firstName: "",
        lastName: "",
        Address: "",
        Apartment: "",
        City: "",
        State: "",
        ZipCode: "",
        Email: "",
        PhoneNumber: "",
    });
    const [err, setErr] = useState({
        firstName: "",
        lastName: "",
        Address: "",
        Apartment: "",
        City: "",
        State: "",
        ZipCode: "",
        Email: "",
        PhoneNumber: "",
    });
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const appliedCouponCode = useSelector((state) => state.cart.appliedCouponCode);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getValue = (e) => {
        setInputData({ ...inputData, [e.target.id]: e.target.value });
        setErr({ ...err, [e.target.id]: "" });
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 576);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const checkOutValidtion = async (e) => {
        e.preventDefault();
        let validationError = {};
        if (inputData.firstName === "") {
            validationError.firstName = "Please enter a first name.";
        }

        if (inputData.lastName === "") {
            validationError.lastName = "Please enter a last name.";
        }

        if (inputData.Address === "") {
            validationError.Address = "Please enter a street address.";
        }

        if (inputData.City === "") {
            validationError.City = "Please enter a city.";
        }

        if (inputData.State === "") {
            validationError.State = "Please enter a State.";
        }

        if (inputData.ZipCode === "") {
            validationError.ZipCode = "Please enter a zip/postal code.";
        }

        if (inputData.Email === "") {
            validationError.Email = "The email field cannot be blank.";
        } else {
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!regex.test(inputData.Email)) {
                validationError.Email = "Invalid email format";
            }
        }

        if (inputData.PhoneNumber === "") {
            validationError.PhoneNumber = "Please enter a phone number.";
        } else if (inputData.PhoneNumber.length < 10) {
            validationError.PhoneNumber = "Number length should be 10";
        }

        setErr(validationError);

        if (Object.keys(validationError).length === 0) {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/checkout`, inputData);
                // console.log(res);
                if (res.status === 200) {
                    setGeneratePDF(true);
                    Swal.fire({
                        title: "Success!",
                        text: isMobile ? "Your order was placed successfully. Download your receipt below." : "Your order was placed successfully. Download your receipt",
                        icon: "success",
                    });
                }
            } catch (error) {
                console.log(error);
                Swal.fire({
                    title: "Oops!",
                    text: "Something went wrong with the checkout process. Please try again.",
                    icon: "error",
                });
            }
        } else {
            Swal.fire({
                title: "Incomplete Information",
                text: "Please fill out all the required fields correctly before proceeding.",
                icon: "warning",
            });
        }
    };
    const accId = localStorage.getItem("userAccId");

    const pdfBtnHandler = async () => {
        Swal.fire({
            title: "Thank You for Your Purchase!",
            text: "Your order has been successfully placed.",
            icon: "success",
        });

        await axios
            .post(`${process.env.REACT_APP_API_URL}/v1/data/prevOrders`, { accId })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.log(err));

        setTimeout(() => {
            setGeneratePDF(false);
            navigate("/");
            dispatch(cartAction.clearCart());
        }, 3000);
    };

    return (
        <>
            <Scrollbtn></Scrollbtn>
            <div className="my-4 space-1">
                <div className="row">
                    <div className="col-lg-8 col-12">
                        <div>
                            <h2 className="checkout_heading">Checkout</h2>
                        </div>
                        <form onSubmit={checkOutValidtion}>
                            <div className="checkout_form">
                                <div className="d-flex gap-4 ">
                                    <div className="form-floating w-100">
                                        <input
                                            type="text"
                                            autoComplete="off"
                                            className="form-control"
                                            style={{ borderColor: err.firstName ? "red" : "#ccc" }}
                                            value={inputData.firstName}
                                            onChange={getValue}
                                            id="firstName"
                                            placeholder="firstName"
                                        />
                                        <label htmlFor="firstName">First Name *</label>
                                        {err.firstName && <p className="err">{err.firstName}</p>}
                                    </div>
                                    <div className="form-floating w-100">
                                        <input
                                            type="text"
                                            autoComplete="off"
                                            className="form-control"
                                            style={{ borderColor: err.lastName ? "red" : "#ccc" }}
                                            value={inputData.lastName}
                                            onChange={getValue}
                                            id="lastName"
                                            placeholder="lastName"
                                        />
                                        <label htmlFor="lastName">Last Name *</label>
                                        {err.lastName && <p className="err">{err.lastName}</p>}
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="form-floating w-100">
                                        <input
                                            type="text"
                                            autoComplete="off"
                                            className="form-control"
                                            style={{ borderColor: err.Address ? "red" : "#ccc" }}
                                            value={inputData.Address}
                                            onChange={getValue}
                                            id="Address"
                                            placeholder="Address"
                                        />
                                        <label htmlFor="Address">Address *</label>
                                        {err.Address && <p className="err">{err.Address}</p>}
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="form-floating w-100">
                                        <input
                                            type="text"
                                            autoComplete="off"
                                            className="form-control"
                                            style={{ borderColor: err.City ? "red" : "#ccc" }}
                                            value={inputData.City}
                                            onChange={getValue}
                                            id="City"
                                            placeholder="City"
                                        />
                                        <label htmlFor="City">City *</label>
                                        {err.City && <p className="err">{err.City}</p>}
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="form-floating w-100">
                                        <input
                                            type="text"
                                            autoComplete="off"
                                            className="form-control"
                                            style={{ borderColor: err.Apartment ? "red" : "#ccc" }}
                                            value={inputData.Apartment}
                                            onChange={getValue}
                                            id="Apartment"
                                            placeholder="Apartment"
                                        />
                                        <label htmlFor="Apartment">Apartment (optional) *</label>
                                        {err.Apartment && <p className="err">{err.Apartment}</p>}
                                    </div>
                                </div>
                                <div className="d-flex gap-4 ">
                                    <div className="form-floating w-100">
                                        <input
                                            type="text"
                                            autoComplete="off"
                                            className="form-control"
                                            style={{ borderColor: err.State ? "red" : "#ccc" }}
                                            value={inputData.State}
                                            onChange={getValue}
                                            id="State"
                                            placeholder="State"
                                        />
                                        <label htmlFor="State">State *</label>
                                        {err.State && <p className="err">{err.State}</p>}
                                    </div>
                                    <div className="form-floating w-100">
                                        <input
                                            type="text"
                                            autoComplete="off"
                                            className="form-control"
                                            style={{ borderColor: err.ZipCode ? "red" : "#ccc" }}
                                            value={inputData.ZipCode}
                                            onChange={getValue}
                                            id="ZipCode"
                                            placeholder="ZipCode"
                                        />
                                        <label htmlFor="ZipCode">Zip Code *</label>
                                        {err.ZipCode && <p className="err">{err.ZipCode}</p>}
                                    </div>
                                </div>
                                <div>
                                    <h2 className="checkout_heading">Contact Information</h2>
                                </div>
                                <div className="d-flex">
                                    <div className="form-floating w-100">
                                        <input
                                            type="text"
                                            autoComplete="off"
                                            className="form-control"
                                            style={{ borderColor: err.Email ? "red" : "#ccc" }}
                                            value={inputData.Email}
                                            onChange={getValue}
                                            id="Email"
                                            placeholder="Email"
                                        />
                                        <label htmlFor="Email">Email *</label>
                                        {err.Email && <p className="err">{err.Email}</p>}
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="form-floating w-100">
                                        <input
                                            type="number"
                                            className="form-control"
                                            style={{ borderColor: err.PhoneNumber ? "red" : "#ccc" }}
                                            value={inputData.PhoneNumber}
                                            onChange={getValue}
                                            id="PhoneNumber"
                                            placeholder="Phone Number"
                                        />
                                        <label htmlFor="PhoneNumber">Phone Number *</label>
                                        {err.PhoneNumber && <p className="err">{err.PhoneNumber}</p>}
                                    </div>
                                </div>
                                <div>
                                    <input value={"Continue to Payment"} type="submit"></input>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-4 col-12">
                        <div className="ps-lg-5 mt-lg-0 mt-4">
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
                            {generatePDF && inputData.firstName && (
                                <PDFDownloadLink
                                    className="downloadLink"
                                    document={<Pdf inputData={inputData} cartItems={cartItems} totalAmount={totalAmount} appliedCouponCode={appliedCouponCode} />}
                                    fileName="order_receipt.pdf"
                                    onClick={pdfBtnHandler}
                                >
                                    {({ loading }) => (loading ? "Generating PDF..." : "Download Receipt")}
                                </PDFDownloadLink>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;
