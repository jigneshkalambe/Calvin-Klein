import React from "react";

const PageNotFound = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light text-dark">
            <h1 className="display-1 fw-bold">404</h1>
            <p className="fs-4 mt-3">Oops! The page you're looking for doesn't exist.</p>
            <a href="/" className="btn btn-primary mt-4">
                Go Home
            </a>
        </div>
    );
};

export default PageNotFound;
