import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = (props) => {
    return (
        <div>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="">{props.title}</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    Appeal
                </li>
            </ol>
        </div>
    );
};

export default Breadcrumb;
