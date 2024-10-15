import React from "react";

const Helmet = (props) => {
    document.title = props.title;
    return <>{props.children}</>;
};

export default Helmet;
