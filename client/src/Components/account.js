import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Overview from "./Overview";
import UserInfo from "./UserInfo";
import { useDispatch } from "react-redux";
import { cartAction } from "../Store/Slice/CartSlice";
const Account = () => {
    const [component, setComponent] = useState("overview");
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
            .get(`http://localhost:5000/v1/account`)
            .then((res) => {
                console.log(res.data.Accounts);
                const accounts = res.data.Accounts;
                const currentAccount = accounts.find((accounts) => accounts._id === userId);
                console.log("currentAccFromAccount", currentAccount);
                if (currentAccount) {
                    setFirstName(currentAccount.firstName);
                    setLastName(currentAccount.lastName);
                    setEmail(currentAccount.email);
                    setNumber(currentAccount.number);
                    setGender(currentAccount.gender);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const componentRender = (name) => {
        if (name === "overview") {
            return <Overview firstName={firstName} lastName={lastName} email={email} number={number} gender={gender}></Overview>;
        } else {
            return <UserInfo firstName={firstName} lastName={lastName} email={email} number={number} gender={gender}></UserInfo>;
        }
    };

    const signoutHandler = () => {
        localStorage.removeItem("userAccId");
        dispatch(cartAction.clearCart());
        navigate("/");
        window.location.reload();
    };

    useEffect(() => {
        accName();
    });

    return (
        <>
            <div className="home-space-1">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="User_SideBar">
                            <h2>Hi, {firstName}</h2>
                            <div>
                                <button onClick={() => setComponent("overview")}>Overview</button>
                                <button onClick={() => setComponent("userinfo")}>Personal Information</button>
                                <Link to={`/cart`}>Cart</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9">
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
