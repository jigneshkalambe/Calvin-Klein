import React, { useEffect, useState } from "react";
import Layout from "./Components/Layout";
import Loader from "./Components/Loader";
import AccountDetailsContext from "./Components/AccountDetailsContext";
import axios from "axios";
import { useLocation } from "react-router-dom";
import useAccountDetails from "./hooks/useAccountDetails";

function App() {
    const [loader, setLoader] = useState(true);
    const [isWishListProduct, setIsWishListProduct] = useState([]);
    const [reloadAPI, setReloadAPI] = useState(false);
    const location = useLocation();
    const fetchAccountDetails = useAccountDetails();

    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 1000);
    });

    // const fetchAccountDetails = async () => {
    //     try {
    //         const response = await axios.get(`${process.env.REACT_APP_API_URL}/v1/account`);
    //         console.log("fetchedAccountDetails", response.data.Accounts[0]);
    //         if (response.data.Accounts[0]) {
    //             setIsWishListProduct(response.data.Accounts[0].wishlistProducts);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching account details:", error);
    //     }
    // };

    const getAccountDetails = async () => {
        const response = await fetchAccountDetails();
        if (response) {
            setIsWishListProduct(response.wishlistProducts);
        }
    };

    useEffect(() => {
        // fetchAccountDetails();

        getAccountDetails();
    }, [location, reloadAPI]);

    return (
        <>
            {loader ? (
                <Loader />
            ) : (
                <AccountDetailsContext.Provider value={{ isWishListProduct, setIsWishListProduct, reloadAPI, setReloadAPI }}>
                    <Layout />
                </AccountDetailsContext.Provider>
            )}
        </>
    );
}

export default App;
