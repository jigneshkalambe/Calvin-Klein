import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../Store/Slice/CartSlice";
import { Link } from "react-router-dom";

const Carts = () => {
    const products = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const deleteProduct = (id) => {
        dispatch(cartAction.deleteProducts({ id }));
    };
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    // console.log(totalAmount);
    return (
        <>
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
                            {/* <div className="d-flex gap-4 flex-column">
                                {products?.map((val, ind) => {
                                    return (
                                        <div className="cartP_box" key={ind}>
                                            <div className="row">
                                                <div className="col-lg-2">
                                                    <div className="cartP_imgBox">
                                                        <img alt="" src={val.img01}></img>
                                                    </div>
                                                </div>
                                                <div className="col-lg-7">
                                                    <div className="cartP_contentBox">
                                                        <h3>{val.title}</h3>
                                                        <div className="d-flex align-items-center">
                                                            <i className="bx bx-check"></i>
                                                            <p>{val.discount}% off</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="cartP_priceBox">
                                                        <div>
                                                            <p className="mb-0">Quantity : {val.quantity}</p>
                                                            <div className="d-flex align-items-center gap-2">
                                                                <span className="old_price">${val.old_price}</span>
                                                                <span className="new_price">${val.new_price}</span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <button onClick={deleteProduct}>Remove</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div> */}
                            <table className="table table-bordered table-hover table-striped">
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
                                                <th>{ind + 1}</th>
                                                <th className="d-flex justify-content-center ">
                                                    <img width={100} alt="" src={val.img01}></img>
                                                </th>
                                                <th>{val.title}</th>
                                                <th>{val.quantity}</th>
                                                <th>${val.totalPrice.toFixed()}</th>
                                                <th>
                                                    <button onClick={() => deleteProduct(val.id)} className="btn border-0 fs-4">
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
