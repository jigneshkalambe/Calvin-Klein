import React from "react";
import { Bars } from "react-loader-spinner";

const Loader = () => {
    const styles = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    };
    return (
        <div style={styles}>
            <Bars height="80" width="80" color="#000" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
        </div>
    );
};

export default Loader;
