import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Men from "../Pages/Men";
import Women from "../Pages/Women";
import context_ex from "../Components/Maincontext";
import ProductDetails from "../Components/ProductDetails";
import Kids from "../Pages/Kids";
import Carts from "../Pages/Carts";
import Checkout from "../Pages/Checkout";
import Createaccount from "../Pages/Createaccount";
import Account from "../Components/account";
import Overview from "../Components/Overview";
import UserInfo from "../Components/UserInfo";
import Wishlist from "../Components/Wishlist";
import PageNotFound from "../Components/PageNotFound";
function Routers() {
    const [component, setComponent] = useState();
    return (
        <>
            <context_ex.Provider value={{ component, setComponent }}>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/men" element={<Men />}></Route>
                    <Route path="/women" element={<Women />}></Route>
                    <Route path="/kids" element={<Kids />}></Route>
                    <Route path="/men/:id" element={<ProductDetails />}></Route>
                    <Route path="/women/:id" element={<ProductDetails />}></Route>
                    <Route path="/kids/:id" element={<ProductDetails />}></Route>
                    <Route path="/men_top/:id" element={<ProductDetails />}></Route>
                    <Route path="/men_bottom/:id" element={<ProductDetails />}></Route>
                    <Route path="/men_arrival/:id" element={<ProductDetails />}></Route>
                    <Route path="/men_outerwear/:id" element={<ProductDetails />}></Route>
                    <Route path="/men_suiting/:id" element={<ProductDetails />}></Route>
                    <Route path="/women_top/:id" element={<ProductDetails />}></Route>
                    <Route path="/women_bottom/:id" element={<ProductDetails />}></Route>
                    <Route path="/women_arrival/:id" element={<ProductDetails />}></Route>
                    <Route path="/women_outerwear/:id" element={<ProductDetails />}></Route>
                    <Route path="/women_suiting/:id" element={<ProductDetails />}></Route>
                    <Route path="/cart" element={<Carts />}></Route>
                    <Route path="/checkout" element={<Checkout />}></Route>
                    <Route path="/createaccount" element={<Createaccount />}></Route>
                    <Route path="/account" element={<Account />}></Route>
                    <Route path="/overview" element={<Overview />}></Route>
                    <Route path="/userinfo" element={<UserInfo />}></Route>
                    <Route path="/wishlist" element={<Wishlist />}></Route>
                    <Route path="*" element={<PageNotFound />}></Route>
                </Routes>
            </context_ex.Provider>
        </>
    );
}

export default Routers;
