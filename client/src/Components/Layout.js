import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Routers from "../Routes_File/Routers";
import { ToastContainer, Zoom } from "react-toastify";

function Layout() {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Zoom}
            />
            <Header></Header>
            <>
                <Routers></Routers>
            </>
            <Footer></Footer>
        </>
    );
}

export default Layout;
