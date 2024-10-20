import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const UserInfo = ({ firstName, lastName, email, number, gender }) => {
    const [updateData, setUpdateData] = useState({
        firstName: firstName || "",
        lastName: lastName || "",
        email: email || "",
        number: number || "",
        gender: gender || "",
    });
    const [userInfo, setUserInfo] = useState({
        firstName: firstName,
        lastName: lastName,
        email: email,
        number: number,
        gender: gender,
    });
    const [passData, setPassData] = useState({
        email,
        currentPassword: "",
        newPassword: "",
    });
    const [CurrentIcon, setCurrentIcon] = useState("password");
    const [eyeIcon, setEyeIcon] = useState("password");

    const backtoOverview = () => {
        return (window.location.href = "/account");
    };

    const getData = (e) => {
        setUpdateData({ ...updateData, [e.target.id]: e.target.value });
    };

    const updateHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/v1/account/updateAccount`, updateData).then((res) => {
                // console.log("updateAccount", res);
                if (res.status === 200) {
                    Swal.fire({
                        title: "Success",
                        text: "Your account has been updated successfully",
                        icon: "success",
                    });
                }
            });
        } catch (error) {
            console.log(error);
            if (error.response.status === 400) {
                Swal.fire({
                    title: "Error",
                    text: error.response.data.message,
                    icon: "error",
                });
            }
        }
    };

    const getPass = (e) => {
        setPassData({ ...passData, [e.target.id]: e.target.value });
    };

    const passUpdateHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/v1/account/passUpdate`, passData).then((res) => {
                // console.log(res);
                if (res.status === 200) {
                    Swal.fire({
                        title: "Success",
                        text: res.data.message,
                        icon: "success",
                    }).then(() => {
                        backtoOverview();
                    });
                }
            });
        } catch (error) {
            console.log(error);
            if (error.response.status === 400) {
                Swal.fire({
                    title: "Error",
                    text: error.response.data.message,
                    icon: "error",
                });
            }
        }
    };

    return (
        <>
            <div className="UserInfo">
                <div className="d-flex mb-4">
                    <h2>Personal Information</h2>
                </div>
                <div className="d-flex flex-column gap-3">
                    <h4 className="mb-2">Sign In Information</h4>
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-4">
                            <p>Email</p>
                        </div>
                        <div className="col-lg-9 col-md-8 col-8">
                            <p>{email ? email : "loading..."}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-4">
                            <p>Password</p>
                        </div>
                        <div className="col-lg-9 col-md-8 col-8">
                            <span>****** </span>
                            <Link data-bs-target="#offcanvas_pass" data-bs-toggle="offcanvas">
                                Change
                            </Link>
                            <div className="offcanvas  offcanvas-white offcanvas-end " id="offcanvas_pass">
                                <div className="offcanvas-header pt-5">
                                    <i className="bx bx-x button" data-bs-dismiss="offcanvas"></i>
                                </div>
                                <div className="offcanvas-body passUpdateBox">
                                    <h2>Change Your Password</h2>
                                    <p>You can update your password. If you want to update your email, you’ll have to create a new account.</p>
                                    <form onSubmit={passUpdateHandler}>
                                        <div className="d-flex flex-column gap-3">
                                            <div className="form-floating position-relative w-100">
                                                <input
                                                    autoComplete="off"
                                                    onChange={getPass}
                                                    type={CurrentIcon}
                                                    className="form-control position-relative"
                                                    id="currentPassword"
                                                    placeholder="currentPassword"
                                                />
                                                <div className="pass-eyes-box">
                                                    <i
                                                        className={`bx ${CurrentIcon === "password" ? "bxs-show" : "bxs-hide"} password-eyes`}
                                                        onClick={() => {
                                                            setCurrentIcon((CurrentIcon) => (CurrentIcon === "text" ? "password" : "text"));
                                                        }}
                                                    ></i>
                                                </div>
                                                <label htmlFor="currentPassword">Current Password *</label>
                                            </div>
                                            <div className="form-floating position-relative w-100">
                                                <input autoComplete="off" onChange={getPass} type={eyeIcon} className="form-control position-relative" id="newPassword" placeholder="newPassword" />
                                                <div className="pass-eyes-box">
                                                    <i
                                                        className={`bx ${eyeIcon === "password" ? "bxs-show" : "bxs-hide"} password-eyes`}
                                                        onClick={() => {
                                                            setEyeIcon((eyeIcon) => (eyeIcon === "text" ? "password" : "text"));
                                                        }}
                                                    ></i>
                                                </div>
                                                <label htmlFor="newPassword">New Password *</label>
                                            </div>
                                            <button type="submit" className="passBtn">
                                                Update my Password
                                            </button>
                                            <Link className="d-block link-dark text-center" data-bs-dismiss="offcanvas">
                                                Cancel
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="UserInfoForm">
                    <h4 className="mb-2">About Me</h4>
                    <form onSubmit={updateHandler}>
                        <div className="d-flex gap-4 mb-3">
                            <div className="form-floating w-100">
                                <input type="text" className="form-control" autoComplete="off" onChange={getData} id="firstName" defaultValue={userInfo.firstName} placeholder="firstName" />
                                <label htmlFor="firstName">First Name *</label>
                            </div>
                            <div className="form-floating w-100">
                                <input type="text" className="form-control" autoComplete="off" onChange={getData} id="lastName" defaultValue={userInfo.lastName} placeholder="lastName" />
                                <label htmlFor="lastName">Last Name *</label>
                            </div>
                        </div>
                        <div className="d-flex mb-3">
                            <div className="form-floating w-100">
                                <input type="text" defaultValue={userInfo.number} autoComplete="off" className="form-control" onChange={getData} id="number" placeholder="number" />
                                <label htmlFor="number">Phone Number (Optional)</label>
                            </div>
                        </div>
                        <div className="d-flex mb-3">
                            <div className="form-floating w-100">
                                <input type="text" defaultValue={userInfo.gender} autoComplete="off" className="form-control" onChange={getData} id="gender" placeholder="gender" />
                                <label htmlFor="gender">gender (Optional)</label>
                            </div>
                        </div>
                        <button type="submit">Update</button>
                    </form>
                </div>
                <Link className="link-dark" onClick={backtoOverview}>
                    Go back to overview
                </Link>
            </div>
        </>
    );
};

export default UserInfo;
