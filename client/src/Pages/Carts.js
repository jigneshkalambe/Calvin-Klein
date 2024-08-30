import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../Store/Slice/CartSlice";
import { Link } from "react-router-dom";
import ScrollBtn from "../Components/ScrollBtn";
import axios from "axios";

const Carts = () => {
    const userId = localStorage.getItem("userAccId");
    const products = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();

    const deleteItem = async (id) => {
        dispatch(cartAction.deleteProducts({ id }));
        await axios
            .post(`http://localhost:5000/v1/data/delete`, { id, userId })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.log(err));
    };

    const totalAmount = useSelector((state) => state.cart.totalAmount);
    return (
        <>
            <ScrollBtn></ScrollBtn>
            {products.length === 0 ? (
                <div className="my-5">
                    <h2 className="cartp_h2">Your Cart is Empty</h2>
                </div>
            ) : (
                <div className="my-5 space-1">
                    <div className="my-5 d-flex align-items-center gap-2">
                        <h2 className="text-center m-0 text-dark">Shopping Bag</h2>
                        <span className="mt-3">({products.length} itmes)</span>
                    </div>
                    <div className="row">
                        <div className="col-lg-9">
                            <table className="table table-bordered table-hover ">
                                <thead className="text-center">
                                    <tr>
                                        <th>id</th>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Quantity</th>
                                        <th>Total Price</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody className="align-middle text-center table-group-divider">
                                    {products?.map((val, ind) => {
                                        return (
                                            <tr key={ind}>
                                                <th className="cart_table_th">{ind + 1}</th>
                                                <th className="d-flex justify-content-center ">
                                                    <img width={100} alt="" src={val.img01}></img>
                                                </th>
                                                <th className="cart_table_th">{val.title}</th>
                                                <th className="cart_table_th">{val.quantity}</th>
                                                <th className="cart_table_th">${val.totalPrice.toFixed()}</th>
                                                <th className="cart_table_th">
                                                    <button onClick={() => deleteItem(val.id)} className="btn border-0 fs-4">
                                                        <i className="bx bx-trash"></i>
                                                    </button>
                                                </th>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-lg-3 position-relative">
                            <div className="cartP_totalbox">
                                <h2>Order Summary</h2>
                                <div>
                                    <div>
                                        <p>Subtotal</p>
                                    </div>
                                    <div>
                                        <span>${totalAmount.toFixed()}</span>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p>Shipping</p>
                                    </div>
                                    <div>
                                        <span className="text-success fw-bold">FREE</span>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p>Tax</p>
                                    </div>
                                    <div>
                                        <span>Calculated in checkout</span>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <h3>Estimated Total</h3>
                                    </div>
                                    <div>
                                        <h3>${totalAmount.toFixed()}</h3>
                                    </div>
                                </div>
                                <div>
                                    <Link to={`/checkout`}>Check Out</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Carts;
