import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserInfo = ({ firstName, lastName, email }) => {
    const [userInfo, setUserInfo] = useState({
        firstName: firstName,
        lastName: lastName,
        email: email,
    });

    const backtoOverview = () => {
        return (window.location.href = "/account");
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
                    <form>
                        <div className="d-flex gap-4 mb-3">
                            <div className="form-floating w-100">
                                <input type="text" className="form-control" id="firstName" value={userInfo.firstName} placeholder="firstName" />
                                <label htmlFor="firstName">First Name *</label>
                            </div>
                            <div className="form-floating w-100">
                                <input type="text" className="form-control" id="lastName" value={userInfo.lastName} placeholder="lastName" />
                                <label htmlFor="lastName">Last Name *</label>
                            </div>
                        </div>
                        <div className="d-flex mb-3">
                            <div className="form-floating w-100">
                                <input type="text" className="form-control" id="Phone_Number" placeholder="Phone_Number" />
                                <label htmlFor="Phone_Number">Phone Number (Optional)</label>
                            </div>
                        </div>
                        <div className="d-flex mb-3">
                            <div className="form-floating w-100">
                                <input type="text" className="form-control" id="Gender" placeholder="Gender" />
                                <label htmlFor="Gender">Gender (Optional)</label>
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
