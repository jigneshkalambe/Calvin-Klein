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
function Routers() {
    const [component, setComponent] = useState();
    useEffect(() => {});
    return (
        <div>
            <context_ex.Provider value={{ component, setComponent }}>
                <Routes>
                    <Route path="/" element={<Home></Home>}></Route>
                    <Route path="/men" element={<Men></Men>}></Route>
                    <Route path="/men/:id" element={<ProductDetails></ProductDetails>}></Route>
                    <Route path="/women" element={<Women></Women>}></Route>
                    <Route path="/women/:id" element={<ProductDetails></ProductDetails>}></Route>
                    <Route path="/kids" element={<Kids></Kids>}></Route>
                    <Route path="/kids/:id" element={<ProductDetails></ProductDetails>}></Route>
                    <Route path="/cart" element={<Carts></Carts>}></Route>
                    <Route path="/checkout" element={<Checkout></Checkout>}></Route>
                </Routes>
            </context_ex.Provider>
        </div>
    );
}

export default Routers;
