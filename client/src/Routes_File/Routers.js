import React, { useEffect, useState } from "react";
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
function Routers() {
    const [component, setComponent] = useState();
    return (
        <div>
            <context_ex.Provider value={{ component, setComponent }}>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/men" element={<Men />}></Route>
                    <Route path="/women" element={<Women />}></Route>
                    <Route path="/kids" element={<Kids />}></Route>
                    <Route path="/men/:id" element={<ProductDetails />}></Route>
                    <Route path="/women/:id" element={<ProductDetails />}></Route>
                    <Route path="/kids/:id" element={<ProductDetails />}></Route>
                    <Route path="/cart" element={<Carts />}></Route>
                    <Route path="/checkout" element={<Checkout />}></Route>
                    <Route path="/createaccount" element={<Createaccount />}></Route>
                    <Route path="/account" element={<Account />}></Route>
                    <Route path="/overview" element={<Overview />}></Route>
                    <Route path="/userinfo" element={<UserInfo />}></Route>
                </Routes>
            </context_ex.Provider>
        </div>
    );
}

export default Routers;
