import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartItems from "./cartItems";
import ScrollBtn from "./ScrollBtn";
import axios from "axios";
import Swal from "sweetalert2";
import { cartAction } from "../Store/Slice/CartSlice";
import All_Product from "../Web_Data/Data";

function Header() {
    const userId = localStorage.getItem("userAccId");
    const [eyeIcon, setEyeIcon] = useState("password");
    const [accData, setAccData] = useState(false);
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const [headerProducts, setHeaderProducts] = useState([]);
    const [searchProducts, setSearchProducts] = useState("");
    const navigate = useNavigate();
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const cartItem = useSelector((state) => state.cart.cartItems);

    useEffect(() => {
        const headerProducts = [...All_Product].sort(() => Math.random() - 0.5);
        const sliceProducts = headerProducts.slice(0, 4);
        setHeaderProducts(sliceProducts);
    }, []);

    useEffect(() => {
        const tabs = document.querySelectorAll(".tab-btn");
        const allContent = document.querySelectorAll(".tab-content");
        tabs.forEach((tab, index) => {
            tab.addEventListener("click", () => {
                tabs.forEach((tab) => tab.classList?.remove("active"));
                allContent.forEach((content) => content.classList?.remove("active"));
                tab.classList?.add("active");
                allContent[index].classList?.add("active");
            });
        });
    }, []);

    const getData = (e) => {
        setLoginData({ ...loginData, [e.target.id]: e.target.value });
    };

    const dispatch = useDispatch();

    const submitData = async (e) => {
        e.preventDefault();
        await axios
            .post(`http://localhost:5000/v1/login`, loginData)
            .then((res) => {
                // console.log(res);
                localStorage.setItem("userAccId", res.data.User._id);
                if (res.status === 200) {
                    const fetchCart = async () => {
                        try {
                            await axios.get(`http://localhost:5000/v1/account`).then((res) => {
                                // console.log(res, "cartItems");
                                const accounts = res.data.Accounts;
                                const userId = localStorage.getItem("userAccId");
                                const currentAccount = accounts.find((account) => account._id === userId);
                                // console.log("CurrentAccInCartItem", currentAccount);
                                if (currentAccount && currentAccount.products) {
                                    const cartItems = currentAccount.products;
                                    // console.log("Products in current account:", cartItems);
                                    dispatch(cartAction.initializeCart(cartItems));
                                } else {
                                    // console.error("No products found for the current account");
                                }
                            });
                        } catch (err) {
                            console.error("Failed to fetch cart items:", err);
                        }
                    };
                    fetchCart();
                    Swal.fire({
                        title: "Login Success",
                        text: "You have been logged in successfully",
                        icon: "success",
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                Swal.fire({
                    title: "Login Failed",
                    text: err.response.data.message,
                    icon: "error",
                });
            });
    };

    useEffect(() => {
        const accDataFetch = async () => {
            // console.log("accDataFetch Fn worked");

            const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
            if (storedCartItems) {
                dispatch(cartAction.initializeCart(storedCartItems));
                // console.log("got stored items from api");
            } else {
                // console.log("No stored cart items found, fetching from API...");
                await axios
                    .get(`http://localhost:5000/v1/account`)
                    .then((res) => {
                        // console.log(res, "Response");
                        // console.log("Accounts array", res.data.Accounts);
                        const accounts = res.data.Accounts;
                        // console.log("userIDFromLocal", userId);
                        const currentUserId = accounts.find((account) => account._id === userId);

                        if (currentUserId && currentUserId.products) {
                            dispatch(cartAction.initializeCart(currentUserId.products));
                        }
                        // console.log("Current User", currentUserId);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        };
        accDataFetch();

        if (userId) {
            setAccData(true);
        } else {
            setAccData(false);
        }
    }, [userId, dispatch]);

    const pathLoader = (path) => {
        switch (path) {
            case "men":
                navigate("/men");
                window.location.reload();
                break;
            case "women":
                navigate("/women");
                window.location.reload();
                break;
            case "kids":
                navigate("/kids");
                window.location.reload();
                break;
            default:
                console.log("Unrecognised path");
        }
    };

    return (
        <div className="space-1">
            <ScrollBtn></ScrollBtn>
            <div className="header">
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                    <div className="ul-box">
                        <ul className="menu">
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
                        </ul>
                    </div>
                    <div className="d-flex gap-3 align-items-center">
                        <i className="bx bx-menu menu-off" data-bs-toggle="offcanvas" data-bs-target="#offcanvas-menu"></i>
                        <div className="d-flex align-items-center">
                            {accData === true ? (
                                <Link to={`/account`}>
                                    <i className="bx bx-user userIcon"></i>
                                </Link>
                            ) : (
                                <div className="dropdown-header">
                                    <i className="bx bx-user userIcon"></i>
                                    <div className="dropdown-header-content">
                                        <Link data-bs-target="#SignInOffCanvas" data-bs-toggle="offcanvas">
                                            Sign In
                                        </Link>
                                        <Link to={`/createaccount`}>Create Account</Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="offcanvas offcanvas-start offcanvas-menu" id="offcanvas-menu">
                        <div className="offcanvas-header">
                            <i className="bx bx-x input-group-text close" data-bs-dismiss="offcanvas"></i>
                        </div>
                        <ul id="offcanvas2-a">
                            <li>
                                <Link onClick={() => pathLoader("women")}>Women</Link>
                            </li>
                            <li>
                                <Link onClick={() => pathLoader("men")}>Men</Link>
                            </li>
                            <li>
                                <Link onClick={() => pathLoader("kids")}>Kids</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="offcanvas offcanvas-start offcanvas2" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions2" aria-labelledby="offcanvasWithBothOptionsLabel">
                        <div className="offcanvas-header justify-content-between align-items-center mt-4">
                            <div className="offcanvas2-a-box"></div>
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
                                        <img alt="" className="img-fluid d-block" src="https://media1.calvinklein.com/images/20240430/Nav/SP24_MD_W_SMTH_CTN_SWTR_3_2x.webp"></img>
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
                                        <img alt="" className="img-fluid d-block" src="https://media1.calvinklein.com/images/20240326/Nav/Nav_Drop_Down_Men_Apparel_2x.webp"></img>
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
                                        <img alt="" className="img-fluid d-block" src="https://media1.calvinklein.com/images/20240319/Nav/Nav_Drop_Down_Girls_2x.webp"></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                    <Link to="/">
                        <img src="/Assets/img/Logo.svg" className="logo" alt="" />
                    </Link>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
                    <div className="icon-box">
                        <Link to="" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions">
                            <i className="bx bx-search"></i>
                        </Link>

                        <div className="offcanvas  offcanvas-search offcanvas-end" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                            <div className="offcanvas-header">
                                <div className="input-group">
                                    <i className="bx bx-search input-group-text search"></i>
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        className="form-control header-input"
                                        placeholder="What are you looking for..."
                                        onChange={(e) => setSearchProducts(e.target.value)}
                                    />
                                    <i className="bx bx-x input-group-text close" data-bs-dismiss="offcanvas"></i>
                                </div>
                            </div>
                            <div className="offcanvas-body">
                                <p>Popular Categories</p>

                                <div className="first-a">
                                    <button onClick={() => pathLoader("men")}>Men</button>
                                    <button onClick={() => pathLoader("women")}>Women</button>
                                    <button onClick={() => pathLoader("kids")}>Kids</button>
                                </div>

                                <p>Products</p>

                                <div className="row ">
                                    {searchProducts === ""
                                        ? headerProducts?.map((val, ind) => {
                                              return (
                                                  <div className="col-6" key={ind}>
                                                      <div className="search-box">
                                                          <div className="search-img-box">
                                                              <Link to={`/${val.category}/${val.id}`}>
                                                                  <img alt="" src={val.img01}></img>
                                                              </Link>
                                                          </div>
                                                          <div className="search-body">
                                                              <Link className="title">
                                                                  <h4>{val.title}</h4>
                                                              </Link>
                                                              <div className="d-flex gap-2 align-items-center">
                                                                  {val.old_price ? <p className="old-price">${val.old_price}</p> : null}
                                                                  <p className="new-price">${val.new_price}</p>
                                                                  {val.discount ? <p className="discount">{val.discount}%</p> : null}
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                              );
                                          })
                                        : All_Product.filter((item) => {
                                              return item.title && item.title.toLowerCase().includes(searchProducts.toLowerCase());
                                          }).map((val, ind) => {
                                              return (
                                                  <div className="col-6" key={ind}>
                                                      <div className="search-box ">
                                                          <div className="search-img-box">
                                                              <Link to={`/${val.category}/${val.id}`}>
                                                                  <img alt="" src={val.img01}></img>
                                                              </Link>
                                                          </div>
                                                          <div className="search-body">
                                                              <Link className="title">
                                                                  <h4>{val.title}</h4>
                                                              </Link>
                                                              <div className="d-flex gap-2 align-items-center">
                                                                  {val.old_price ? <p className="old-price">${val.old_price}</p> : null}
                                                                  <p className="new-price">${val.new_price}</p>
                                                                  {val.discount ? <p className="discount">{val.discount}%</p> : null}
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                              );
                                          })}
                                </div>
                            </div>
                        </div>
                        <div>
                            {accData === true ? (
                                <Link to={`/account`}>
                                    <i className="bx bx-user userIcon2"></i>
                                </Link>
                            ) : (
                                <div className="dropdown-header">
                                    <i className="bx bx-user userIcon2"></i>
                                    <div className="dropdown-header-content">
                                        <Link data-bs-target="#SignInOffCanvas" data-bs-toggle="offcanvas">
                                            Sign In
                                        </Link>
                                        <Link to={`/createaccount`}>Create Account</Link>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="offcanvas sign_offcanvas offcanvas-end" id="SignInOffCanvas">
                            <form onSubmit={submitData}>
                                <div className="offcanvas-header">
                                    <i className="bx bx-x button" data-bs-dismiss="offcanvas"></i>
                                </div>
                                <div className="offcanvas-body">
                                    <div>
                                        <h5 className="signin_heading">Sign In</h5>
                                    </div>
                                    <div className="d-flex flex-column gap-4 mt-4">
                                        <div className="form-floating w-100">
                                            <input type="text" autoComplete="off" onChange={getData} value={loginData.email} className="form-control" id="email" placeholder="email" />
                                            <label htmlFor="email">Email *</label>
                                        </div>
                                        <div className="form-floating position-relative w-100">
                                            <input
                                                type={eyeIcon}
                                                autoComplete="off"
                                                onChange={getData}
                                                value={loginData.password}
                                                className="form-control position-relative"
                                                id="password"
                                                placeholder="password"
                                            />
                                            <div className="pass-eyes-box">
                                                <i
                                                    className={`bx ${eyeIcon === "password" ? "bxs-show" : "bxs-hide"} password-eyes`}
                                                    onClick={() => {
                                                        setEyeIcon((eyeIcon) => (eyeIcon === "text" ? "password" : "text"));
                                                    }}
                                                ></i>
                                            </div>
                                            <label htmlFor="password">Password *</label>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="SignInBtn btn btn-dark" type="submit">
                                            Sign In
                                        </button>
                                    </div>
                                    <div className="d-flex justify-content-center mt-4">
                                        <p className="d-flex gap-2 m-0">
                                            Don't have an account?
                                            <Link to="/createaccount" className="text-dark text-decoration-underline">
                                                Create Account
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="cart-icon">
                            <i data-bs-toggle="offcanvas" data-bs-target="#offcanvasDark" className="bx bx-shopping-bag"></i>
                            <div className="offcanvas  offcanvasCart offcanvas-end " id="offcanvasDark">
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
                                                return <CartItems key={val.id || ind} items={val}></CartItems>;
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
