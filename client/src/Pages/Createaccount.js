import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const Createaccount = () => {
    const [eyeIcon, setEyeIcon] = useState("text");
    const [CreateFromData, setCreateFromData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const [CreateErr, setCreateErr] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const CreateGetValue = (e) => {
        setCreateFromData({ ...CreateFromData, [e.target.id]: e.target.value });
        setCreateErr({ ...CreateErr, [e.target.id]: "" });
    };

    const CreateValidation = (e) => {
        let CreateValidationErr = { ...CreateErr };
        const { id, value } = e.target;
        // console.log(id, value);
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (id === "firstName") {
            if (value === "") {
                CreateValidationErr.firstName = "Please enter your first name";
            }
        } else if (id === "lastName") {
            if (value === "") {
                CreateValidationErr.lastName = "Please enter your last name";
            }
        } else if (id === "email") {
            if (value === "") {
                CreateValidationErr.email = "Please enter your email";
            } else if (!regex.test(value)) {
                CreateValidationErr.email = "Invalid email format";
            }
        } else if (id === "password") {
            if (value === "") {
                CreateValidationErr.password = "Please enter your password";
            }
        }

        setCreateErr(CreateValidationErr);
    };
    const navigate = useNavigate();
    const CreateaccountHandler = async (e) => {
        e.preventDefault();
        await axios
            .post(`http://localhost:5000/v1/account/createAccount`, CreateFromData)
            .then((res) => {
                console.log(res);
                localStorage.setItem("userAccId", res.data.Users._id);
                Swal.fire({
                    title: "Account Created",
                    text: "Account Created successfully",
                    icon: "success",
                }).then(() => {
                    navigate("/");
                    // window.location.reload();
                });
                setCreateFromData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                });
                // console.log(res.data.token);
                // localStorage.setItem("user token", res.data.token);
            })
            .catch((error) => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.response.data.message,
                });
            });
    };

    return (
        <div className="create_page">
            <div>
                <h3>Create an Account</h3>
            </div>
            <form onSubmit={CreateaccountHandler}>
                <div className="d-flex flex-column  mt-4">
                    <div className="form-floating mb-3 w-100">
                        <input
                            type="text"
                            className="form-control"
                            value={CreateFromData.firstName}
                            onBlur={CreateValidation}
                            onChange={CreateGetValue}
                            style={{ borderColor: CreateErr.firstName ? "red" : "#ccc" }}
                            id="firstName"
                            placeholder="firstName"
                        />
                        <label htmlFor="firstName">First Name *</label>
                        {CreateErr.firstName && <p className="err">{CreateErr.firstName}</p>}
                    </div>
                    <div className="form-floating mb-3 w-100">
                        <input
                            type="text"
                            className="form-control"
                            value={CreateFromData.lastName}
                            onBlur={CreateValidation}
                            onChange={CreateGetValue}
                            style={{ borderColor: CreateErr.lastName ? "red" : "#ccc" }}
                            id="lastName"
                            placeholder="lastName"
                        />
                        <label htmlFor="lastName">Last Name *</label>
                        {CreateErr.lastName && <p className="err">{CreateErr.lastName}</p>}
                    </div>
                    <div className="form-floating mb-3 w-100">
                        <input
                            type="text"
                            className="form-control"
                            value={CreateFromData.email}
                            onBlur={CreateValidation}
                            onChange={CreateGetValue}
                            style={{ borderColor: CreateErr.email ? "red" : "#ccc" }}
                            id="email"
                            placeholder="email"
                        />
                        <label htmlFor="email">Email *</label>
                        {CreateErr.email && <p className="err">{CreateErr.email}</p>}
                    </div>
                    <div className="form-floating  w-100">
                        <input
                            type={eyeIcon}
                            className="form-control position-relative"
                            value={CreateFromData.password}
                            onBlur={CreateValidation}
                            onChange={CreateGetValue}
                            style={{ borderColor: CreateErr.password ? "red" : "#ccc" }}
                            id="password"
                            placeholder="password"
                        />
                        <div className="pass-eyes-box">
                            <i
                                className={`bx ${eyeIcon === "password" ? "bxs-show" : "bxs-hide"} password-eyes fs-4`}
                                onClick={() => {
                                    setEyeIcon((eyeIcon) => (eyeIcon === "text" ? "password" : "text"));
                                }}
                            ></i>
                        </div>
                        <label htmlFor="password">Create a Password *</label>
                    </div>
                    <div>{CreateErr.password && <p className="err">{CreateErr.password}</p>}</div>
                    <div className="mt-3">
                        <button type="submit">Create an Account</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Createaccount;
