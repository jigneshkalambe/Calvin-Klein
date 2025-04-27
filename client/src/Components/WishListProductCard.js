import React from "react";
import { Link } from "react-router-dom";

const WishListProductCard = ({ products, deleteProductHandler, className }) => {
    return (
        <div className={`d-flex overflow-hidden flex-column flex-grow-1 border border-1 border-light rounded-4 shadow-sm h-100 ${className}`}>
            <Link to={`/${products.category}/${products.id}`}>
                <div className="w-100 ">
                    <img src={products.img01} alt="WishListProduct" className="img-fluid" style={{ height: "432px" }} />
                </div>
            </Link>
            <div className="p-3 d-flex flex-column justify-content-between h-100 gap-2">
                <div>
                    <p style={{ fontSize: "16px" }}>{products.title}</p>
                    <span
                        style={{
                            fontSize: "14px",
                        }}
                    >
                        ${products.new_price}
                    </span>
                </div>
                <div className="d-flex gap-3">
                    <button className="btn btn-outline-danger w-100" onClick={() => deleteProductHandler(products.id)}>
                        Delete
                    </button>
                    <button className="btn btn-primary w-100">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default WishListProductCard;
