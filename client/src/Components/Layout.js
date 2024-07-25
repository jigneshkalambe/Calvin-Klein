import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Routers from "../Routes_File/Routers";

function Layout() {
    return (
        <div>
            <Header></Header>
            <div>
                <Routers></Routers>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Layout;
