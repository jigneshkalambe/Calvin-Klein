import React, { useEffect, useState } from "react";
import Helmet from "./Helmet";
import axios from "axios";
import WishListProductCard from "./WishListProductCard";
import useGsap from "../hooks/useGsap";

const Wishlist = () => {
    useGsap();
    const [wishListProducts, setWishListProducts] = useState([]);
    const userId = localStorage.getItem("userAccId");

    const accName = async () => {
        await axios
            .get(`${process.env.REACT_APP_API_URL}/v1/account`)
            .then((res) => {
                const accounts = res.data.Accounts;
                const currentAccount = accounts.find((accounts) => accounts._id === userId);
                console.log("currentAccFromAccount", currentAccount);
                if (currentAccount) {
                    setWishListProducts(currentAccount.wishlist);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        accName();
    }, []);

    const deleteProductHandler = async (id) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/v1/data/DeleteWishlistProduct`, { accId: userId, id: id });
            if (response.data) {
                setWishListProducts(response.data.data);
            }
        } catch (error) {
            console.error("Failed to delete product:", error);
        }
    };

    const clearAllWishlistHandler = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/v1/data/clearAllWishlist`, { accId: userId });
            if (response.data.success) {
                setWishListProducts([]);
            } else {
                console.log("Failed to clear wishlist:", response.data.message);
            }
        } catch (error) {
            console.error("Failed to clear wishlist:", error);
        }
    };

    return (
        <Helmet title="Wishlist">
            <div className="my-5 space-1">
                <div className="d-flex flex-column">
                    <h1 className="m-0 text-dark">My Wishlist</h1>
                    {wishListProducts && wishListProducts.length > 0 ? (
                        <>
                            <span className="mt-3"> {wishListProducts.length} items in your wishlist </span>
                            <div className="mt-4">
                                <button onClick={clearAllWishlistHandler} className="btn btn-danger d-block">
                                    Clear Wishlist
                                </button>
                            </div>
                        </>
                    ) : (
                        <span className="mt-3"> No items in your wishlist </span>
                    )}
                </div>
                <div className="row mt-4">
                    {wishListProducts.map((product, index) => {
                        return (
                            <div className="col-lg-3 col-md-3 col-sm-6 col-6" key={index}>
                                <WishListProductCard className={"gsap-stagger"} deleteProductHandler={deleteProductHandler} products={product} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </Helmet>
    );
};

export default Wishlist;
