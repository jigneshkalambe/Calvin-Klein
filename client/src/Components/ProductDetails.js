import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import All_Product from "../Web_Data/Data";
import { useDispatch } from "react-redux";
import { cartAction } from "../Store/Slice/CartSlice";
import ScrollBtn from "./ScrollBtn";
import axios from "axios";
import Swal from "sweetalert2";
import ProductCard from "./ProductCard";
import useGsap from "../hooks/useGsap";
import AccountDetailsContext from "./AccountDetailsContext";

const ProductDetails = () => {
    useGsap();
    const { id } = useParams();
    const FilterProduct = All_Product.find((product) => product.id == id);
    const { desc, img01, img02, img03, img04, category, line, title, new_price, discount, old_price } = FilterProduct;
    const [defaultImg, setDefaultImg] = useState(img01);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const dispatch = useDispatch();
    const { isWishListProduct, setReloadAPI } = useContext(AccountDetailsContext);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        setDefaultImg(img01);
    }, [img01]);

    const userAccId = localStorage.getItem("userAccId");

    const addFn = async () => {
        if (!userAccId) {
            Swal.fire({
                text: "Login Or Create Account first",
                icon: "error",
            });
            return;
        }

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
        let accId = localStorage.getItem("userAccId");
        try {
            const response = await axios
                .post(`${process.env.REACT_APP_API_URL}/v1/data`, {
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
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const products = All_Product.filter((product) => product.category === category);
        const randomProducts = [...products].sort(() => Math.random() - 0.5);
        const slicedProducts = randomProducts.slice(0, 4);
        setRelatedProducts(slicedProducts);
    }, [category]);

    const images = [img01, img02, img03, img04];

    return (
        <>
            <ScrollBtn></ScrollBtn>
            <div className="Men-space-1">
                <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="product_row g-3">
                            <div className="col-lg-3 col-md-3 col-sm-3 col-12">
                                <div className="lil_Main_box">
                                    {images.map(
                                        (img, index) =>
                                            img && (
                                                <div key={index} className="lil_box gsap-stagger">
                                                    <img alt="" onClick={() => setDefaultImg(img)} src={img}></img>
                                                </div>
                                            )
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-9 col-sm-9 col-12">
                                <div className="Product_img_box gsap-bottom-to-top">
                                    <img alt="" src={defaultImg}></img>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="Product_Box gsap-bottom-to-top">
                            {line && <span>{line}</span>}
                            <h4>{title}</h4>
                            <div className="d-flex gap-2 align-items-center">
                                {old_price ? <p className="old-price">${old_price}</p> : null}
                                <p className="new-price">${new_price}</p>
                                {discount ? <p className="discount">{discount}% off</p> : null}
                            </div>
                            <div className="w-100">
                                <button onClick={addFn}>Add to Bag - ${new_price}</button>
                            </div>
                            <div className="desc">
                                <h5>About {title}</h5>
                                <p>{desc}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-flex my-5 justify-content-center pt-5">
                    <h2 className="m-0">You May Also Like</h2>
                </div>
                <div className="row g-3">
                    {relatedProducts?.map((val, ind) => {
                        const isAddedToWishlist = Array.isArray(isWishListProduct) && isWishListProduct.some((product) => product.productId === val.id);
                        return (
                            <div className="col-lg-3 col-md-6 col-sm-6 col-12" key={ind}>
                                <ProductCard setReloadAPI={setReloadAPI} isWishListProduct={isAddedToWishlist} className="gsap-bottom-to-top" items={val} key={ind} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default ProductDetails;
