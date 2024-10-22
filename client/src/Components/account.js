import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Overview from "./Overview";
import UserInfo from "./UserInfo";
import { useDispatch } from "react-redux";
import { cartAction } from "../Store/Slice/CartSlice";
import OrderHistory from "./OrderHistory";
const Account = () => {
    const [component, setComponent] = useState("overview");
    const [historyProducts, setHistoryProducts] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [number, setNumber] = useState();
    const [gender, setGender] = useState();
    const userId = localStorage.getItem("userAccId");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const accName = async () => {
        await axios
            .get(`${process.env.REACT_APP_API_URL}/v1/account`)
            .then((res) => {
                // console.log(res.data.Accounts);
                const accounts = res.data.Accounts;
                const currentAccount = accounts.find((accounts) => accounts._id === userId);
                console.log("currentAccFromAccount", currentAccount);
                if (currentAccount) {
                    setFirstName(currentAccount.firstName);
                    setLastName(currentAccount.lastName);
                    setEmail(currentAccount.email);
                    setNumber(currentAccount.number);
                    setGender(currentAccount.gender);
                    setHistoryProducts(currentAccount.prevOrders);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const componentRender = (name) => {
        if (name === "overview") {
            return <Overview firstName={firstName} lastName={lastName} email={email} number={number} gender={gender}></Overview>;
        } else if (name === "OrderHistory") {
            return <OrderHistory historyProducts={historyProducts} setHistoryProducts={setHistoryProducts}></OrderHistory>;
        } else {
            return <UserInfo firstName={firstName} lastName={lastName} email={email} number={number} gender={gender}></UserInfo>;
        }
    };

    const signoutHandler = () => {
        localStorage.removeItem("userAccId");
        dispatch(cartAction.clearCart());
        navigate("/");
    };

    useEffect(() => {
        accName();
    }, []);

    return (
        <>
            <div className="Men-space-1">
                <div className="row">
                    <div className="col-lg-3 col-md-4 col-12">
                        <div className="User_SideBar">
                            <h2>Hi, {firstName}</h2>
                            <div>
                                <button onClick={() => setComponent("overview")}>Overview</button>
                                <button onClick={() => setComponent("userinfo")}>Personal Information</button>
                                <Link to={`/cart`}>Cart</Link>
                                <button onClick={() => setComponent("OrderHistory")}>OrderHistory</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 col-md-8 col-12">
                        {componentRender(component)}
                        <div className="mt-4">
                            <button className="btn btn-danger d-block" onClick={signoutHandler}>
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Account;
