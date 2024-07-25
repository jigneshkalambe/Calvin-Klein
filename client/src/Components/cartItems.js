import React from "react";
// import img1 from "../Web_Data/images/11171050_061_main.webp";
import { useDispatch } from "react-redux";
import { cartAction } from "../Store/Slice/CartSlice";
import axios from "axios";
const CartItems = (props) => {
    const { id, desc, img01, img02, img03, img04, line, discount, title, quantity, old_price, new_price } = props.items;
    const dispatch = useDispatch();

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
                .post(`http://localhost:5000/api/items`, {
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
                    console.log(res);
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
        if (!id) {
            console.error("product is missing");
            return;
        }
        dispatch(cartAction.removeProducts({ id }));
        try {
            const response = await axios.post(`http://localhost:5000/api/items/remove`, { id });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteItem = () => {
        dispatch(cartAction.deleteProducts({ id }));
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
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-4">
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
