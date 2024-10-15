import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { cartAction } from "../Store/Slice/CartSlice";
import axios from "axios";
const CartItems = (props) => {
    const { id, desc, img01, img02, img03, img04, line, discount, title, quantity, old_price, new_price } = props.items;
    const dispatch = useDispatch();
    const accId = localStorage.getItem("userAccId");

    useEffect(() => {
        const fetchCart = async () => {
            try {
                await axios.get(`http://localhost:5000/v1/account`).then((res) => {
                    console.log(res, "cartItems");
                    const accounts = res.data.Accounts;
                    const currentAccount = accounts.find((account) => account._id === accId);
                    console.log("CurrentAccInCartItem", currentAccount);

                    if (currentAccount && currentAccount.products) {
                        const cartItems = currentAccount.products;
                        console.log("Products in current account:", cartItems); // Check if all items are logged
                        dispatch(cartAction.initializeCart(cartItems));
                    } else {
                        console.error("No products found for the current account");
                    }
                });
            } catch (err) {
                console.error("Failed to fetch cart items:", err);
            }
        };
        fetchCart();
    }, [dispatch]);

    const addItem = async () => {
        if (!id) {
            console.error("product is missing");
            return;
        }
        dispatch(
            cartAction.addProducts({
                id,
                desc,
                img01,
                img02,
                img03,
                img04,
                line,
                title,
                new_price,
                discount,
                old_price,
            })
        );

        try {
            const response = await axios
                .post(`http://localhost:5000/v1/data`, {
                    accId,
                    id,
                    desc,
                    img01,
                    img02,
                    img03,
                    img04,
                    line,
                    title,
                    new_price,
                    discount,
                    old_price,
                })
                .then((res) => {
                    // console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

    const removeItem = async () => {
        if (!id || !accId) {
            console.error("product is missing or accId is missing");
            return;
        }
        await axios
            .post(`http://localhost:5000/v1/data/remove`, { id, accId })
            .then((res) => {
                console.log("frontProducts", res);
            })
            .catch((err) => console.log(err));
        dispatch(cartAction.removeProducts({ id }));
    };

    const deleteItem = async () => {
        dispatch(cartAction.deleteProducts({ id }));
        await axios
            .post(`http://localhost:5000/v1/data/delete`, { id, accId })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="cartItemBox">
            <div className="cartImgBox">
                <img src={img01} alt=""></img>
            </div>
            <div className="cartDetail">
                <div>
                    <h3>{title}</h3>
                    <div className="d-flex gap-2 mt-2">
                        {old_price ? <p className="cart_old_price">${old_price}</p> : ""}
                        {new_price ? <p className="cart_new_price">${new_price}</p> : ""}
                    </div>
                </div>
                <div className="d-flex justify-content-lg-between gapC justify-content-md-center align-items-center">
                    <div className="d-flex align-items-center gap-lg-4 gap-md-4 gap-lg-4 gap-2">
                        <p>Quantity:</p>
                        <div className="cart_inc_dec">
                            <button onClick={removeItem}>
                                <i className="bx bx-minus"></i>
                            </button>
                            <p>{quantity}</p>
                            <button onClick={addItem}>
                                <i className="bx bx-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div>
                        <button className="cart_remove" onClick={deleteItem}>
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItems;
