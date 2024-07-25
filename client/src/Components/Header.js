import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItems from "./cartItems";

function Header() {
    // const [defaultTab, setDefaultTab] = useState("Women");
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    useEffect(() => {
        const tabs = document.querySelectorAll(".tab-btn");
        const allContent = document.querySelectorAll(".tab-content");
        // const defaultTabIndex = Array.from(tabs).findIndex((tab) => tab.textContent.trim() === defaultTab);
        // tabs[defaultTabIndex].classList.add("active");
        // allContent[defaultTabIndex].classList?.add("active");
        tabs.forEach((tab, index) => {
            tab.addEventListener("click", () => {
                tabs.forEach((tab) => tab.classList?.remove("active"));
                allContent.forEach((content) => content.classList?.remove("active"));
                tab.classList?.add("active");
                allContent[index].classList?.add("active");
            });
        });
    }, []);
    const cartItem = useSelector((state) => state.cart.cartItems);
    // console.log(cartItem.length);
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    return (
        <div className="space-1">
            <div className="header">
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                    <div className="ul-box">
                        <ul className="menu">
                            {/* <li>
                                    <Link data-bs-toggle="offcanvas" to="#offcanvasWithBothOptions2">
                                        New
                                    </Link>
                                </li> */}
                            <li>
                                <Link className="tab-btn" id="women" data-bs-toggle="offcanvas" to="#offcanvasWithBothOptions2">
                                    Women
                                </Link>
                            </li>
                            <li>
                                <Link className="tab-btn" id="men" data-bs-toggle="offcanvas" to="#offcanvasWithBothOptions2">
                                    Men
                                </Link>
                            </li>
                            <li>
                                <Link className="tab-btn" id="kid" data-bs-toggle="offcanvas" to="#offcanvasWithBothOptions2">
                                    Kids
                                </Link>
                            </li>
                            {/* <li>
                                    <Link data-bs-toggle="offcanvas" to="#offcanvasWithBothOptions2">
                                        Essebtials
                                    </Link>
                                </li>
                                <li>
                                    <Link data-bs-toggle="offcanvas" to="#offcanvasWithBothOptions2">
                                        Sale
                                    </Link>
                                </li> */}
                        </ul>
                    </div>
                    <i className="bx bx-menu menu-off" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions2"></i>

                    <div
                        className="offcanvas offcanvas-start offcanvas2"
                        data-bs-scroll="true"
                        tabIndex="-1"
                        id="offcanvasWithBothOptions2"
                        aria-labelledby="offcanvasWithBothOptionsLabel"
                    >
                        <div className="offcanvas-header justify-content-between align-items-center mt-4">
                            <div className="offcanvas2-a-box">
                                {/* <ul id="offcanvas2-a">
                                        <li>
                                            <Link className="tab-btn">Women</Link>
                                        </li>
                                        <li>
                                            <Link className="tab-btn">Men</Link>
                                        </li>
                                        <li>
                                            <Link className="tab-btn">Kids</Link>
                                        </li>
                                    </ul> */}
                            </div>
                            <img src="Assets/img/ck-logo-white.svg" className="logo2 mx-auto" alt="" />
                            <i className="bx bx-x input-group-text close" data-bs-dismiss="offcanvas"></i>
                        </div>
                        <div className="offcanvas-body">
                            <div className="women-box tab-content">
                                <div className="row">
                                    <div className="col-8">
                                        <h6>Shop Women</h6>
                                        <div>
                                            <Link to="/women">Apparel</Link>
                                            <Link>Accessories</Link>
                                            <Link>Shoes</Link>
                                            <Link>Frangrance</Link>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <img
                                            alt=""
                                            className="img-fluid d-block"
                                            src="https://media1.calvinklein.com/images/20240430/Nav/SP24_MD_W_SMTH_CTN_SWTR_3_2x.webp"
                                        ></img>
                                    </div>
                                </div>
                            </div>
                            <div className="men-box tab-content">
                                <div className="row">
                                    <div className="col-8">
                                        <h6>Shop Men</h6>
                                        <div>
                                            <Link to="/men">Apparel</Link>
                                            <Link>Accessories</Link>
                                            <Link>Shoes</Link>
                                            <Link>Frangrance</Link>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <img
                                            alt=""
                                            className="img-fluid d-block"
                                            src="https://media1.calvinklein.com/images/20240326/Nav/Nav_Drop_Down_Men_Apparel_2x.webp"
                                        ></img>
                                    </div>
                                </div>
                            </div>
                            <div className="kid-box tab-content">
                                <div className="row">
                                    <div className="col-8">
                                        <h6>Shop Kids</h6>
                                        <div>
                                            <Link to="/kids">Apparel</Link>
                                            <Link>Accessories</Link>
                                            <Link>Shoes</Link>
                                            <Link>Frangrance</Link>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <img
                                            alt=""
                                            className="img-fluid d-block"
                                            src="https://media1.calvinklein.com/images/20240319/Nav/Nav_Drop_Down_Girls_2x.webp"
                                        ></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                    <Link to="/">
                        <img src="Assets/img/Logo.svg" className="logo" alt="" />
                    </Link>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                    <div className="icon-box">
                        <Link to="" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions">
                            <i className="bx bx-search"></i>
                        </Link>

                        <div
                            className="offcanvas offcanvas-end"
                            data-bs-scroll="true"
                            tabIndex="-1"
                            id="offcanvasWithBothOptions"
                            aria-labelledby="offcanvasWithBothOptionsLabel"
                        >
                            <div className="offcanvas-header">
                                {/* <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>  */}
                                <div className="input-group">
                                    <i className="bx bx-search input-group-text search"></i>
                                    <input
                                        type="text"
                                        className="form-control header-input"
                                        placeholder="What are you looking for..."
                                        name=""
                                        id=""
                                    />
                                    <i className="bx bx-x input-group-text close" data-bs-dismiss="offcanvas"></i>
                                </div>
                            </div>
                            <div className="offcanvas-body">
                                <p>Popular Categories</p>

                                <div className="first-a">
                                    <Link to="/men">Men</Link>
                                    <Link to="/women">Women</Link>
                                    <Link to="/kids">Kids</Link>
                                </div>
                            </div>
                        </div>
                        <Link>
                            <i className="bx bx-user"></i>
                        </Link>
                        <Link className="cart-icon">
                            <i data-bs-toggle="offcanvas" data-bs-target="#offcanvasDark" className="bx bx-shopping-bag"></i>
                            <div className="offcanvas offcanvasCart offcanvas-end " data-bs-backdrop="static" id="offcanvasDark">
                                <div className="offcanvas-header">
                                    <h2>Shopping Bag</h2>
                                    <i className="bx bx-x input-group-text close" data-bs-dismiss="offcanvas"></i>
                                </div>
                                <div className="offcanvas-body">
                                    <div className="cart_item_box">
                                        {cartItem.length === 0 ? (
                                            <h1>You have no items in your bag.</h1>
                                        ) : (
                                            cartItem?.map((val, ind) => {
                                                return <CartItems key={ind} items={val}></CartItems>;
                                            })
                                        )}
                                    </div>
                                    <div className="checkout_box">
                                        <div className="d-flex justify-content-between align-items-center ">
                                            <h6 className="d-flex gap-3  text-white m-0">
                                                Subtotal <p className="m-0">{cartItem.length} items</p>
                                            </h6>
                                            <p className="text-white m-0">${totalAmount.toFixed()}</p>
                                        </div>
                                        <div>
                                            <Link to={`/cart`}> Review + Checkout</Link>
                                        </div>
                                        <div>
                                            <p className="m-0 text-light text-center">Shipping & Taxes Calculated at Checkout</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {totalQuantity === 0 ? "" : <span>{totalQuantity}</span>}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
