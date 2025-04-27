import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Heart } from "lucide-react";

function ProductCard(props) {
    const { img01, img02, img03, img04, old_price, new_price, title, line, id, discount, category, desc } = props.items;

    const { className, isWishListProduct } = props;

    useEffect(() => {
        console.log("ProductCard isWishListProduct", isWishListProduct);
    }, [isWishListProduct]);

    // const isAddedToWishlist = isWishListProduct.some((items) => items.id === id);

    const accId = localStorage.getItem("userAccId");

    const wishlistHandler = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/v1/data/AddWishlistProduct`, {
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
                category,
            });
            console.log("Product added to wishlist:", res);
        } catch (error) {
            // console.error("Failed to add product to wishlist:", error);
            toast.error(error.response.data.message);
        }
    };

    const heartStyle = {
        position: "absolute",
        top: "10px",
        right: "10px",
        padding: "5px",
        cursor: "pointer",
        color: "black",
        transition: "background-color 0.3s, transform 0.3s",
    };

    return (
        <div className={`card-box ${className}`}>
            <div className="card-img-box position-relative">
                <Link className="position-relative">
                    <Link to={`/${category}/${id}`}>
                        <img alt="" src={img01}></img>
                    </Link>
                    <Heart
                        data-bs-toggle="tooltip"
                        data-bs-title={isWishListProduct ? "Remove from wishlist" : "Add to wishlist"}
                        style={heartStyle}
                        fill={isWishListProduct ? "red" : "none"}
                        color={isWishListProduct ? "red" : "black"}
                        onClick={wishlistHandler}
                        size={35}
                    />
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
