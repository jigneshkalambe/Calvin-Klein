import React from "react";
import { Link } from "react-router-dom";

function ProductCard(props) {
    const { img01, img02, img03, old_price, new_price, title, line, id, discount } = props.items;

    return (
        <div className="card-box ">
            <div className="card-img-box">
                <Link to={`/men/${id}`}>
                    <img alt="" src={img01}></img>
                </Link>
                {line ? <span>{line}</span> : null}
            </div>
            <div className="card-body">
                <Link className="title">
                    <h4>{title}</h4>
                </Link>
                <div className="d-flex gap-2 align-items-center">
                    {old_price ? <p className="old-price">${old_price}</p> : null}
                    <p className="new-price">${new_price}</p>
                    {/* {discount === "" ? "" : <p className="discount">{discount}%</p>} */}
                    {discount ? <p className="discount">{discount}%</p> : null}
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
