import React, { useEffect } from "react";
import axios from "axios";
const Account = () => {
    useEffect(() => {
        const accName = async () => {
            await axios
                .get(`http://localhost:5000/v1/account`)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        accName();
    }, []);
    return <div>account</div>;
};

export default Account;
