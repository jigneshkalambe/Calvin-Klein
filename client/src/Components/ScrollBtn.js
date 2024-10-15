import React, { useEffect } from "react";

const ScrollBtn = () => {
    useEffect(() => {
        const scrollTOP = () => {
            const BTN = document.querySelector(".scrollBtn");

            if (window.pageYOffset > 400) {
                BTN.classList.add("show");
            } else {
                BTN.classList.remove("show");
            }
        };
        window.addEventListener("scroll", scrollTOP);
        return () => window.removeEventListener("scroll", scrollTOP);
    }, []);

    const scrollTOP = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            <button className="scrollBtn" onClick={scrollTOP}>
                <i className="bx bx-chevron-up"></i>
                Top
            </button>
        </>
    );
};

export default ScrollBtn;
