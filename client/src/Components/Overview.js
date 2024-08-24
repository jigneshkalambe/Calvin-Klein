import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserInfo from "./UserInfo";

const Overview = ({ firstName, lastName, email }) => {
    const [component, setComponent] = useState(false);
    const renderComponent = () => {
        setComponent(true);
    };

    if (component) {
        return <UserInfo firstName={firstName} lastName={lastName} email={email} />;
    }

    return (
        <>
            <div className="OverviewBox">
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <h2>Personal Information</h2>
                    <Link onClick={renderComponent}>Edit</Link>
                </div>
                <div>
                    <h4>Sign In Information</h4>
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
                            <Link onClick={renderComponent}>Change</Link>
                        </div>
                    </div>
                </div>
                <div>
                    <h4>About me</h4>
                    <div className="row">
                        <div className="col-lg-3">
                            <p>Name</p>
                        </div>
                        <div className="col-lg-9">
                            <p>
                                {firstName && lastName ? (
                                    <>
                                        {firstName}&nbsp;{lastName}
                                    </>
                                ) : (
                                    "Loading..."
                                )}
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3">
                            <p>Phone Number</p>
                        </div>
                        <div className="col-lg-9">
                            <Link onClick={renderComponent}>Add Phone Number</Link>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3">
                            <p>Gender</p>
                        </div>
                        <div className="col-lg-9">
                            <Link onClick={renderComponent}>Add Gender</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Overview;