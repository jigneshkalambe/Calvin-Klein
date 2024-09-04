import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const UserInfo = ({ firstName, lastName, email, number, gender }) => {
    const [updateData, setUpdateData] = useState({
        firstName: firstName,
        lastName: lastName,
        email: email,
        number: "",
        gender: "",
    });
    const [userInfo, setUserInfo] = useState({
        firstName: firstName,
        lastName: lastName,
        email: email,
        number: number,
        gender: gender,
    });

    const backtoOverview = () => {
        return (window.location.href = "/account");
    };

    const getData = (e) => {
        setUpdateData({ ...updateData, [e.target.id]: e.target.value });
    };

    const updateHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/v1/account/updateAccount`, updateData).then((res) => {
                console.log("updateAccount", res);
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

    return (
        <>
            <div className="UserInfo">
                <div className="d-flex mb-4">
                    <h2>Personal Information</h2>
                </div>
                <div className="d-flex flex-column gap-3">
                    <h4 className="mb-2">Sign In Information</h4>
                    <div className="row">
                        <div className="col-lg-3">
                            <p>Email</p>
                        </div>
                        <div className="col-lg-9">
                            <p>{email ? email : "loading..."}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3">
                            <p>Password</p>
                        </div>
                        <div className="col-lg-9">
                            <span>****** </span>
                            <Link>Change</Link>
                        </div>
                    </div>
                </div>
                <div className="UserInfoForm">
                    <h4 className="mb-2">About Me</h4>
                    <form onSubmit={updateHandler}>
                        <div className="d-flex gap-4 mb-3">
                            <div className="form-floating w-100">
                                <input type="text" className="form-control" onChange={getData} id="firstName" defaultValue={userInfo.firstName} placeholder="firstName" />
                                <label htmlFor="firstName">First Name *</label>
                            </div>
                            <div className="form-floating w-100">
                                <input type="text" className="form-control" onChange={getData} id="lastName" defaultValue={userInfo.lastName} placeholder="lastName" />
                                <label htmlFor="lastName">Last Name *</label>
                            </div>
                        </div>
                        <div className="d-flex mb-3">
                            <div className="form-floating w-100">
                                <input type="text" defaultValue={userInfo.number} className="form-control" onChange={getData} id="number" placeholder="number" />
                                <label htmlFor="number">Phone Number (Optional)</label>
                            </div>
                        </div>
                        <div className="d-flex mb-3">
                            <div className="form-floating w-100">
                                <input type="text" defaultValue={userInfo.gender} className="form-control" onChange={getData} id="gender" placeholder="gender" />
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
