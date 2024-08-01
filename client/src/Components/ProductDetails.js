import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import All_Product from "../Web_Data/Data";
import { useDispatch } from "react-redux";
import { cartAction } from "../Store/Slice/CartSlice";
import ScrollBtn from "./ScrollBtn";
import axios from "axios";

const ProductDetails = () => {
    const { id } = useParams();
    const FilterProduct = All_Product.find((product) => product.id == id);
    const { desc, img01, img02, img03, img04, line, title, new_price, discount, old_price } = FilterProduct;
    const [defaultImg, setDefaultImg] = useState(img01);
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
    const dispatch = useDispatch();
    const addFn = async () => {
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

    return (
        <>
            <ScrollBtn></ScrollBtn>
            <div className="Men-space-1">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="row g-3">
                            <div className="col-lg-2">
                                <div className="lil_Main_box">
                                    <div className="lil_box">
                                        <img alt="" onClick={() => setDefaultImg(img01)} src={img01}></img>
                                    </div>
                                    <div className="lil_box">
                                        <img alt="" onClick={() => setDefaultImg(img02)} src={img02}></img>
                                    </div>
                                    <div className="lil_box">
                                        <img alt="" onClick={() => setDefaultImg(img03)} src={img03}></img>
                                    </div>
                                    <div className="lil_box">
                                        <img alt="" onClick={() => setDefaultImg(img04)} src={img04}></img>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-10 ">
                                <div className="Product_img_box">
                                    <img alt="" src={defaultImg}></img>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="Product_Box">
                            {line && <span>{line}</span>}
                            <h4>{title}</h4>
                            <div className="d-flex gap-2 align-items-center">
                                {old_price ? <p className="old-price">${old_price}</p> : null}
                                <p className="new-price">${new_price}</p>
                                {/* {discount === "" ? "" : <p className="discount">{discount}%</p>} */}
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
            </div>
        </>
    );
};

export default ProductDetails;
