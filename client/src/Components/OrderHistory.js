import React, { useEffect } from "react";

const OrderHistory = ({ historyProducts }) => {
    useEffect(() => {
        console.log(historyProducts);
    }, [historyProducts]);

    return (
        <div>
            {historyProducts?.map((orders, ind) => {
                return (
                    <div key={ind}>
                        <h4>Order Date: {new Date(orders.orderDate).toLocaleDateString()}</h4>
                        <div className="row py-4 g-4">
                            {orders.products.map((val, ind) => {
                                return (
                                    <div className="col-lg-2 col-md-6 col-6" key={ind}>
                                        <div className="search-box">
                                            <div className="search-img-box">
                                                <img alt="" src={val.img01}></img>
                                            </div>
                                            <div className="search-body">
                                                <div className="title">
                                                    <h4>{val.title}</h4>
                                                </div>
                                                <div className="d-flex gap-2 align-items-center">
                                                    {val.old_price ? <p className="old-price">${val.old_price}</p> : null}
                                                    <p className="new-price">${val.new_price}</p>
                                                    {val.discount ? <p className="discount">{val.discount}%</p> : null}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default OrderHistory;
