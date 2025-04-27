import React, { useEffect, useState } from "react";
import Layout from "./Components/Layout";
import Loader from "./Components/Loader";
import AccountDetailsContext from "./Components/AccountDetailsContext";
import axios from "axios";

function App() {
    const [loader, setLoader] = useState(true);
    const [isWishListProduct, setIsWishListProduct] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setLoader(false);
        }, 1000);
    });

    const fetchAccountDetails = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/v1/account`);
            console.log("fetchedAccountDetails", response.data.Accounts[0]);
            if (response.data.Accounts[0]) {
                setIsWishListProduct(response.data.Accounts[0].wishlistProducts);
            }
        } catch (error) {
            console.error("Error fetching account details:", error);
        }
    };

    useEffect(() => {
        fetchAccountDetails();
    }, []);

    return (
        <>
            {loader ? (
                <Loader />
            ) : (
                <AccountDetailsContext.Provider value={{ isWishListProduct, setIsWishListProduct }}>
                    <Layout />
                </AccountDetailsContext.Provider>
            )}
        </>
    );
}

export default App;
