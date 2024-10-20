import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../Store/Slice/CartSlice";
import { Link } from "react-router-dom";
import ScrollBtn from "../Components/ScrollBtn";
import axios from "axios";
import Helmet from "../Components/Helmet";
import Coupons from "../Components/Coupons";
const Carts = () => {
    const accId = localStorage.getItem("userAccId");
    const products = useSelector((state) => state.cart.cartItems);
    const [couponCode, setCouponCode] = useState("");
    const dispatch = useDispatch();
    const appliedCouponCode = useSelector((state) => state.cart.appliedCouponCode);

    const deleteItem = async (id) => {
        dispatch(cartAction.deleteProducts({ id }));
        await axios
            .post(`http://localhost:5000/v1/data/delete`, { id, accId })
            .then((res) => {
                // console.log(res);
            })
            .catch((err) => console.log(err));
    };

    const totalAmount = useSelector((state) => state.cart.totalAmount);

    const couponCodeHandler = (e) => {
        e.preventDefault();
        const couponCodeOg = couponCode;

        if (!appliedCouponCode) {
            dispatch(cartAction.discount(couponCodeOg));
        } else {
            alert(`Coupon "${appliedCouponCode}" has already been applied`);
        }
    };

    return (
        <Helmet title="Cart">
            {products.length === 0 ? "" : <Coupons />}
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
                    <div className="d-flex flex-lg-row  flex-column-reverse">
                        <div className="col-lg-9 col-md-12 col-12 table-responsive">
                            <table className="table table-bordered table-hover mt-lg-0 mt-5">
                                <thead className="text-center align-middle">
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
                        <div className="col-lg-3 col-md-12 position-relative ">
                            <div className="cartP_totalbox ps-lg-4 ps-0">
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
                                    <p>Apply Coupon</p>
                                </div>
                                <form onSubmit={couponCodeHandler}>
                                    <div className="d-flex gap-2 mt-1">
                                        <div className="w-100">
                                            <input
                                                type="text"
                                                className="form-control w-100"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                                id="couponCode"
                                                disabled={!!appliedCouponCode}
                                            />
                                        </div>
                                        <div>
                                            <button type="submit" className="applyBtn" disabled={!!appliedCouponCode}>
                                                {appliedCouponCode ? "Applied" : "Apply"}
                                            </button>
                                        </div>
                                    </div>
                                </form>
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
        </Helmet>
    );
};

export default Carts;
