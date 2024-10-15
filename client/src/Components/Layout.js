import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Routers from "../Routes_File/Routers";

function Layout() {
    return (
        <>
            <Header></Header>
            <>
                <Routers></Routers>
            </>
            <Footer></Footer>
        </>
    );
}

export default Layout;
