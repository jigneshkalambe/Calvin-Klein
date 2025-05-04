import axios from "axios";
import React from "react";

const useAccountDetails = () => {
    const fetchAccountDetails = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/v1/account`);
            if (response.data.Accounts[0]) {
                return response.data.Accounts[0];
            }
        } catch (error) {
            console.error("Error fetching account details:", error);
        }
    };
    return fetchAccountDetails;
};

export default useAccountDetails;
