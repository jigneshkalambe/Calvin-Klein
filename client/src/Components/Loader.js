import React from "react";
import { Bars } from "react-loader-spinner";

const Loader = () => {
    const styles = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999,
        backgroundColor: "#fff",
        overflow: "hidden",
    };
    return (
        <div style={styles}>
            <Bars height="80" width="80" color="#000" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
        </div>
    );
};

export default Loader;
